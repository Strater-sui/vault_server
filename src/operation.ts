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
export function newZeroCoin(
  tx: Transaction,
  coinType: string,
): TransactionResult {
  return tx.moveCall({
    target: "0x2::coin::zero",
    typeArguments: [coinType],
  });
}

export function coinFromBalance(
  tx: Transaction,
  coinType: string,
  balance: TransactionArgument,
): TransactionResult {
  return tx.moveCall({
    target: "0x2::coin::from_balance",
    typeArguments: [coinType],
    arguments: [balance],
  });
}

export function coinIntoBalance(
  tx: Transaction,
  coinType: string,
  coin: TransactionArgument,
): TransactionResult {
  return tx.moveCall({
    target: "0x2::coin::into_balance",
    typeArguments: [coinType],
    arguments: [coin],
  });
}

export function getCoinValue(
  tx: Transaction,
  coinType: string,
  coin: TransactionArgument,
): TransactionResult {
  return tx.moveCall({
    target: "0x2::coin::value",
    typeArguments: [coinType],
    arguments: [coin],
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

export function takeProfitsForSelling(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: TARGETS.TAKE_PROFITS_FOR_SELLING,
    arguments: [
      tx.object(OWNED_OBJECTS.SAVING_VAULT_STRATEGY_CAP),
      tx.sharedObjectRef(SHARED_OBJECTS.SBUCK_SAVING_VAULT_STRATEGY),
      tx.pure(bcs.option(bcs.U64).serialize(null)),
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

export function cetusSwapSuiToUsdc(
  tx: Transaction,
  senderAddress: string,
  suiCoin: TransactionArgument,
): TransactionArgument {
  const zeroUsdcCoin = newZeroCoin(tx, COIN_TYPES.USDC);
  const suiCoinValue = getCoinValue(tx, COIN_TYPES.SUI, suiCoin);

  const [usdcOutCoin, suiOutCoin] = tx.moveCall({
    target: TARGETS.CETUS_SWAP,
    typeArguments: [COIN_TYPES.USDC, COIN_TYPES.SUI],
    arguments: [
      tx.sharedObjectRef(SHARED_OBJECTS.CETUS_GLOBAL_CONFIG),
      tx.sharedObjectRef(SHARED_OBJECTS.CETUS_USDC_SUI_POOL),
      zeroUsdcCoin,
      suiCoin,
      tx.pure(bcs.bool().serialize(false)),
      tx.pure(bcs.bool().serialize(true)),
      suiCoinValue,
      tx.pure(bcs.u128().serialize("79226673515401279992447579055")),
      tx.pure(bcs.bool().serialize(false)),
      tx.sharedObjectRef(SHARED_OBJECTS.CLOCK),
    ],
  });

  tx.transferObjects([suiOutCoin], senderAddress);
  return usdcOutCoin;
}

// @return; buckBalance
export function bucketPSMSwapForBuck(
  tx: Transaction,
  coinType: string,
  balance: TransactionArgument,
): TransactionResult {
  return tx.moveCall({
    target: TARGETS.BUCKET_CHARGE_RESERVOIR,
    typeArguments: [coinType],
    arguments: [
      tx.sharedObjectRef(SHARED_OBJECTS.BUCKET_PROTOCOL_OBJECT),
      balance,
    ],
  });
}
