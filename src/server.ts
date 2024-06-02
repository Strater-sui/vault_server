import { Keypair } from "@mysten/sui/cryptography";
import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";
import { getUnderlyingProfits } from "./getter";
import { logger } from "./logger";
import {
  bucketPSMSwapForBuck,
  calcRebalanceAmounts,
  cetusSwapSuiToUsdc,
  coinFromBalance,
  coinIntoBalance,
  depositSoldProfits,
  newZeroBalance,
  rebalance,
  skimBaseProfits,
  takeProfitsForSelling,
} from "./operation";
import { Transaction } from "@mysten/sui/transactions";
import { COIN_TYPES } from "./lib/const";
import { bcs } from "@mysten/sui/bcs";

export class Server {
  private keypair: Keypair;
  private client: SuiClient;

  constructor(keypair: Keypair) {
    this.keypair = keypair;
    this.client = new SuiClient({ url: getFullnodeUrl("mainnet") });
  }

  async rebalance() {
    const tx = new Transaction();

    const underlyingProfits = await getUnderlyingProfits(this.client);

    logger.info({ underlyingProfits });

    if (underlyingProfits >= 100000) {
      // require to swap underlyingProfits for BUCK
      const suiBalance = takeProfitsForSelling(tx);
      const suiCoin = coinFromBalance(tx, COIN_TYPES.SUI, suiBalance);
      const usdcCoin = cetusSwapSuiToUsdc(
        tx,
        this.keypair.toSuiAddress(),
        suiCoin,
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

    const res = await this.client.devInspectTransactionBlock({
      transactionBlock: tx as any,
      sender: this.keypair.toSuiAddress(),
    });

    tx.getData().commands.forEach((data, idx) => logger.info({ idx, data }));
    logger.info({ res });

    if (res.effects.status.status === "success") {
      const resp = this.client.signAndExecuteTransaction({
        transaction: tx,
        signer: this.keypair,
      });
      logger.info({ resp });
    }
  }
}
