import {
  Transaction,
  TransactionArgument,
  TransactionResult,
} from "@mysten/sui/transactions";
import {
  COIN_TYPES,
  OWNED_OBJECTS,
  SHARED_OBJECTS,
  TARGETS,
} from "./lib/const";
import { bcs } from "@mysten/sui/bcs";

export function newZeroBalance(
  tx: Transaction,
  coinType: string,
): TransactionResult {
  return tx.moveCall({
    target: "0x2::balance::zero",
    typeArguments: [coinType],
  });
}

export function underlyingProfits(tx: Transaction) {
  tx.moveCall({
    target: TARGETS.UNDERLYING_PROFITS,
    arguments: [
      tx.sharedObjectRef(SHARED_OBJECTS.SBUCK_SAVING_VAULT_STRATEGY),
      tx.sharedObjectRef(SHARED_OBJECTS.SBUCK_FOUNTAIN),
      tx.sharedObjectRef(SHARED_OBJECTS.CLOCK),
    ],
  });
}

export function skimBaseProfits(tx: Transaction) {
  tx.moveCall({
    target: TARGETS.SKIM_BASE_PROFITS,
    arguments: [
      tx.object(OWNED_OBJECTS.SAVING_VAULT_STRATEGY_CAP),
      tx.sharedObjectRef(SHARED_OBJECTS.SBUCK_SAVING_VAULT_STRATEGY),
      tx.sharedObjectRef(SHARED_OBJECTS.SBUCK_FOUNTAIN),
      tx.sharedObjectRef(SHARED_OBJECTS.SBUCK_FLASK),
      tx.sharedObjectRef(SHARED_OBJECTS.CLOCK),
    ],
  });
}

export function takeProfitsForSelling(tx: Transaction) {
  const foo = tx.pure(bcs.U64.serialize(100));
  tx.moveCall({
    target: TARGETS.TAKE_PROFITS_FOR_SELLING,
    arguments: [
      tx.object(OWNED_OBJECTS.SAVING_VAULT_STRATEGY_CAP),
      tx.sharedObjectRef(SHARED_OBJECTS.SBUCK_SAVING_VAULT_STRATEGY),
      tx.pure(bcs.option(bcs.U8).serialize(0)),
      tx.sharedObjectRef(SHARED_OBJECTS.SBUCK_FOUNTAIN),
      tx.sharedObjectRef(SHARED_OBJECTS.CLOCK),
    ],
  });
}

export function depositSoldProfits(
  tx: Transaction,
  buckBalance: TransactionArgument,
) {
  tx.moveCall({
    target: TARGETS.DEPOSIT_SOLD_PROFITS,
    arguments: [
      tx.object(OWNED_OBJECTS.SAVING_VAULT_STRATEGY_CAP),
      tx.sharedObjectRef(SHARED_OBJECTS.SBUCK_SAVING_VAULT_STRATEGY),
      tx.sharedObjectRef(SHARED_OBJECTS.ST_SBUCK_SAVING_VAULT),
      buckBalance,
      tx.sharedObjectRef(SHARED_OBJECTS.CLOCK),
    ],
  });
}

export function calcRebalanceAmounts(tx: Transaction): TransactionResult {
  // return 'rebalanceAmounts'
  return tx.moveCall({
    target: TARGETS.CALC_REBALANCE_AMOUNTS,
    typeArguments: [COIN_TYPES.BUCK, COIN_TYPES.ST_SBUCK],
    arguments: [
      tx.sharedObjectRef(SHARED_OBJECTS.ST_SBUCK_SAVING_VAULT),
      tx.sharedObjectRef(SHARED_OBJECTS.CLOCK),
    ],
  });
}

export function rebalance(
  tx: Transaction,
  rebalanceAmounts: TransactionArgument,
): TransactionResult {
  // return 'rebalanceAmounts'
  return tx.moveCall({
    target: TARGETS.REBALANCE,
    arguments: [
      tx.object(OWNED_OBJECTS.SAVING_VAULT_STRATEGY_CAP),
      tx.sharedObjectRef(SHARED_OBJECTS.SBUCK_SAVING_VAULT_STRATEGY),
      tx.sharedObjectRef(SHARED_OBJECTS.ST_SBUCK_SAVING_VAULT),
      rebalanceAmounts,
      tx.sharedObjectRef(SHARED_OBJECTS.SBUCK_FOUNTAIN),
      tx.sharedObjectRef(SHARED_OBJECTS.SBUCK_FLASK),
      tx.sharedObjectRef(SHARED_OBJECTS.CLOCK),
    ],
  });
}
