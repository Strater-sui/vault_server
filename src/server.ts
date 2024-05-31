import { Keypair } from "@mysten/sui.js/cryptography";
import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";

export class Server{
  private keypair: Keypair;
  private client: SuiClient;

  constructor(keypair: Keypair) {
    this.keypair = keypair;
    this.client = new SuiClient({ url: getFullnodeUrl("mainnet") });
  }
}
