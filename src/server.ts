import { Keypair } from "@mysten/sui/cryptography";
import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";
import { getUnderlyingProfits } from "./getter";

export class Server{
  private keypair: Keypair;
  private client: SuiClient;

  constructor(keypair: Keypair) {
    this.keypair = keypair;
    this.client = new SuiClient({ url: getFullnodeUrl("mainnet") });
  }

  async rebalance(){
      const underlyingProfits = await getUnderlyingProfits(this.client)

      console.log('underlyingProfits',underlyingProfits)
  }
}

