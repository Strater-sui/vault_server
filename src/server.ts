import { Keypair } from "@mysten/sui/cryptography";
import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";
import { getUnderlyingProfits } from "./getter";
import { logger } from "./logger";
import {
  bucketPSMSwapForBuck,
  calcRebalanceAmounts,
  cetusSwapSuiToUsdc,
  checkCoinThreshold,
  coinFromBalance,
  coinIntoBalance,
  depositSoldProfits,
  newZeroBalance,
  rebalance,
  skimBaseProfits,
  takeProfitsForSelling,
} from "./operation";
import { Transaction, TransactionArgument } from "@mysten/sui/transactions";
import { CETUS_PARTNER_ID, COIN_TYPES, SLIPPAGE } from "./lib/const";
import { BucketClient } from "bucket-protocol-sdk";
import {
  AggregatorClient,
  DEFAULT_ENDPOINT,
} from "@cetusprotocol/aggregator-sdk";
import { BN } from "bn.js";

export class Server {
  private keypair: Keypair;
  private client: SuiClient;
  private aggregator: AggregatorClient;

  constructor(keypair: Keypair) {
    this.keypair = keypair;
    this.client = new SuiClient({ url: getFullnodeUrl("mainnet") });
    this.aggregator = new AggregatorClient({
      endpoint: DEFAULT_ENDPOINT,
      client: this.client as never,
      signer: this.keypair.toSuiAddress(),
      partner: CETUS_PARTNER_ID,
    });
  }

  async rebalance() {
    const tx = new Transaction();

    const underlyingProfits = await getUnderlyingProfits(this.client);

    logger.info({ underlyingProfits: underlyingProfits / 10 ** 9 });

    if (underlyingProfits > 0) {
      // require to swap underlyingProfits for BUCK
      const suiBalance = takeProfitsForSelling(tx);
      const suiCoin = coinFromBalance(tx, COIN_TYPES.SUI, suiBalance);
      const routers = await this.aggregator.findRouters({
        from: COIN_TYPES.SUI,
        target: COIN_TYPES.USDC,
        amount: new BN(underlyingProfits.toFixed(0)),
        byAmountIn: true,
      });

      if (!routers) {
        logger.info("No routers found for swapping SUI for USDC");
        return;
      }
      const usdcCoin = (await this.aggregator.routerSwap({
        txb: tx as never,
        routers,
        inputCoin: suiCoin,
        slippage: 0.05,
        partner: CETUS_PARTNER_ID,
      })) as TransactionArgument;
      const bucketClient = new BucketClient();
      const suiPrice = (await bucketClient.getPrices()).SUI;
      const minUSDCAmount =
        underlyingProfits * suiPrice * (1 - SLIPPAGE) * 10 ** (6 - 9);

      checkCoinThreshold(
        tx,
        usdcCoin,
        COIN_TYPES.USDC,
        BigInt(Math.floor(minUSDCAmount)),
      );
      const usdcBalance = coinIntoBalance(tx, COIN_TYPES.USDC, usdcCoin);
      const buckBalance = bucketPSMSwapForBuck(
        tx,
        COIN_TYPES.USDC,
        usdcBalance,
      );

      // skim accrued fee revenue
      skimBaseProfits(tx);
      depositSoldProfits(tx, buckBalance);
      const rebalanceAmounts = calcRebalanceAmounts(tx);
      rebalance(tx, rebalanceAmounts);
    } else {
      const zeroBuckBalance = newZeroBalance(tx, COIN_TYPES.BUCK);
      skimBaseProfits(tx);
      depositSoldProfits(tx, zeroBuckBalance);
      const rebalanceAmounts = calcRebalanceAmounts(tx);
      rebalance(tx, rebalanceAmounts);
    }

    tx.blockData.transactions.forEach((tx, idx) => console.log({ [idx]: tx }));
    //logger.info({ tx: tx.blockData.transactions });
    tx.setSender(this.keypair.toSuiAddress());
    const bytes = await tx.build({ client: this.client });
    const res = await this.client.dryRunTransactionBlock({
      transactionBlock: bytes,
    });

    logger.info({ res });

    if (res.effects.status.status === "success") {
      const resp = await this.client.signAndExecuteTransaction({
        transaction: tx,
        signer: this.keypair,
      });
      logger.info({ resp });
      logger.info("🚀 successful transaction");
    }
  }
}
