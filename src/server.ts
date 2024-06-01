import { Keypair } from "@mysten/sui/cryptography";
import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";
import { getUnderlyingProfits } from "./getter";
import { logger } from "./logger";
import {
  calcRebalanceAmounts,
  depositSoldProfits,
  newZeroBalance,
  rebalance,
  takeProfitsForSelling,
} from "./operation";
import { Transaction } from "@mysten/sui/transactions";
import { COIN_TYPES } from "./lib/const";

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

    // const profits = takeProfitsForSelling(tx);

    if (underlyingProfits == 0) {
      const zeroBuckBalance = newZeroBalance(tx, COIN_TYPES.BUCK);
      depositSoldProfits(tx, zeroBuckBalance);
      const rebalanceAmounts = calcRebalanceAmounts(tx);
      rebalance(tx, rebalanceAmounts);
    } else {
    }

    const res = await this.client.devInspectTransactionBlock({
      transactionBlock: tx as any,
      sender: this.keypair.toSuiAddress(),
    });
    // logger.info({ tx: tx.getData().commands });
    // logger.info({ res });

    if (res.effects.status.status === "success") {
      const resp = this.client.signAndExecuteTransaction({
        transaction: tx,
        signer: this.keypair,
      });
      logger.info({ resp });
    }
  }
}
