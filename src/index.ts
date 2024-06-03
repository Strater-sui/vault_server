import { Ed25519Keypair, Ed25519PublicKey } from "@mysten/sui/keypairs/ed25519";
import { Server } from "./server";
import { fromHEX } from "@mysten/sui/utils";
import * as dotenv from "dotenv";
import { createPrivateKey } from "crypto";
import { decodeSuiPrivateKey } from "@mysten/sui/cryptography";
import { CronJob } from "cron";
import { logger } from "./logger";
import { BucketClient } from "bucket-protocol-sdk";

dotenv.config();

const secret = process.env.ADMIN_PRIVATE_KEY!;
const { secretKey } = decodeSuiPrivateKey(secret);
const keypair = Ed25519Keypair.fromSecretKey(secretKey);

const vaultServer = new Server(keypair);

(async () => {
  try {
    await vaultServer.rebalance();
  } catch (error) {
    console.log("error", error);
  }
})();

// let num = 0;
// const job = new CronJob("1 */1 * * * *", async function () {
//   try {
//     await vaultServer.rebalance();
//   } catch (error) {
//     logger.error(error);
//   } finally {
//     logger.info("Finish");
//   }
// });
//
// job.start();
