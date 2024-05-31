import { Transaction } from "@mysten/sui/transactions";
import { SHARED_OBJECTS, TARGETS } from "./lib/const";

export  function underlyingProfits(tx: Transaction) {
  tx.moveCall({
    target: TARGETS.UNDERLYING_PROFITS,
    arguments: [tx.sharedObjectRef(SHARED_OBJECTS.SBUCK_SAVING_VAULT_STRATEGY), tx.sharedObjectRef(SHARED_OBJECTS.SBUCK_FOUNTAIN), tx.sharedObjectRef(SHARED_OBJECTS.CLOCK)]
  })
}

export function skimBaseProfits(tx: Transaction) {
  tx.moveCall({
    target: TARGETS.SKIM_BASE_PROFITS,
    arguments: [tx.sharedObjectRef(SHARED_OBJECTS.SBUCK_SAVING_VAULT_STRATEGY), tx.sharedObjectRef(SHARED_OBJECTS.SBUCK_FOUNTAIN), tx.sharedObjectRef(SHARED_OBJECTS.CLOCK)]
  })
}
