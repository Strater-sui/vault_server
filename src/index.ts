import {
  Ed25519Keypair,
  Ed25519PublicKey,
} from "@mysten/sui.js/keypairs/ed25519";
import { Server } from "server";

const keypair = Ed25519Keypair.deriveKeypair(process.env.ADMIN_PHRASE!);
const dcaServer = new Server(keypair);


