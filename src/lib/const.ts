import { normalizeSuiAddress } from "@mysten/sui/utils";

export const SHARED_OBJECTS = {
  ST_SBUCK_SAVING_VAULT: {
    objectId:
      "0xce4643d51afbb49fed00e9d6c6f15988374475c834d1f2ab2d7784769d0f1307",
    initialSharedVersion: 197307499,
    mutable: true,
  },
  SBUCK_SAVING_VAULT_STRATEGY: {
    objectId:
      "0xa262b2f45026d711974aa8056c499a93ffdeadcd75f7138a0d9f43b5f66097a2",
    initialSharedVersion: 197307500,
    mutable: true,
  },
  SBUCK_FLASK: {
    objectId:
      "0xc6ecc9731e15d182bc0a46ebe1754a779a4bfb165c201102ad51a36838a1a7b8",
    initialSharedVersion: 90706194,
    mutable: true,
  },
  SBUCK_FOUNTAIN: {
    objectId:
      "0xbdf91f558c2b61662e5839db600198eda66d502e4c10c4fc5c683f9caca13359",
    initialSharedVersion: 87170268,
    mutable: true,
  },
  CLOCK: {
    objectId: "0x6",
    initialSharedVersion: 1,
    mutable: false,
  },
};
export const OWNED_OBJECTS = {
  VAULT_ADMIN_CAP:
    "0x814e99789317781177f91820f22867ebed4b842cb2a6cac5595f91136f944bde",
  SAVING_VAULT_STRATEGY_CAP:
    "0xe987dd204d30ae2e4c34b4a7e719094d8a5490136413a3a8104b79a69a98d990",
};

export const DUMMY_ADDRESS =
  "0x0c434f35a9b9a569e4f6476b6d1dafcc767de25f3d143e864e8ce319df85d052";

const SAVING_VAULT_PACKAGE_ID =
  "0x5dbe7ac885a796a823c7241d190e6a0aa7404b30848465cafa226acccbe01fec";
export const TARGETS = {
  // SAVING_VAULT_STRATEGY
  UNDERLYING_PROFITS:
    "0x5dbe7ac885a796a823c7241d190e6a0aa7404b30848465cafa226acccbe01fec::sbuck_saving_vault::underlying_profits",
  SKIM_BASE_PROFITS:
    "0x5dbe7ac885a796a823c7241d190e6a0aa7404b30848465cafa226acccbe01fec::sbuck_saving_vault::skim_base_profits",
  TAKE_PROFITS_FOR_SELLING:
    "0x5dbe7ac885a796a823c7241d190e6a0aa7404b30848465cafa226acccbe01fec::sbuck_saving_vault::take_profits_for_selling",
  DEPOSIT_SOLD_PROFITS:
    "0x5dbe7ac885a796a823c7241d190e6a0aa7404b30848465cafa226acccbe01fec::sbuck_saving_vault::deposit_sold_profits",
  REBALANCE:
    "0x5dbe7ac885a796a823c7241d190e6a0aa7404b30848465cafa226acccbe01fec::sbuck_saving_vault::rebalance",
  // SAVING_VAULT
  CALC_REBALANCE_AMOUNTS:
    "0x5dbe7ac885a796a823c7241d190e6a0aa7404b30848465cafa226acccbe01fec::vault::calc_rebalance_amounts",
};

export const COIN_TYPES = {
  BUCK: "0xce7ff77a83ea0cb6fd39bd8748e2ec89a3f41e8efdc3f4eb123e0ca37b184db2::buck::BUCK",
  ST_SBUCK:
    "0xbe225286e3b4aa2aea6ed2087da3a6db42eace16412dad723d2a3867846cf9f4::st_sbuck::ST_SBUCK",
};
