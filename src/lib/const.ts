import { normalizeSuiAddress } from "@mysten/sui/utils";

export const SHARED_OBJECTS = {
    ST_SBUCK_SAVING_VAULT: {
      objectId: "0xce4643d51afbb49fed00e9d6c6f15988374475c834d1f2ab2d7784769d0f1307",
      initialSharedVersion: 197307499,
      mutable: true,
    },
    SBUCK_SAVING_VAULT_STRATEGY: {
      objectId: "0xa262b2f45026d711974aa8056c499a93ffdeadcd75f7138a0d9f43b5f66097a2",
      initialSharedVersion: 197307500,
      mutable: true,
    },
    SBUCK_FLASK: {
      objectId: "0xc6ecc9731e15d182bc0a46ebe1754a779a4bfb165c201102ad51a36838a1a7b8",
      initialSharedVersion: 90706194,
      mutable: true,
    },
    SBUCK_FOUNTAIN: {
      objectId: "0xbdf91f558c2b61662e5839db600198eda66d502e4c10c4fc5c683f9caca13359",
      initialSharedVersion: 87170268,
      mutable: true,
    },
    CLOCK: {
      objectId: "0x6",
      initialSharedVersion: 1,
      mutable: false,
    }
}

export const DUMMY_ADDRESS =
  "0x0c434f35a9b9a569e4f6476b6d1dafcc767de25f3d143e864e8ce319df85d052";

const SAVING_VAULT_PACKAGE_ID = "0x5dbe7ac885a796a823c7241d190e6a0aa7404b30848465cafa226acccbe01fec"
export const TARGETS = {
  UNDERLYING_PROFITS: "0x5dbe7ac885a796a823c7241d190e6a0aa7404b30848465cafa226acccbe01fec::sbuck_saving_vault::underlying_profits",
  SKIM_BASE_PROFITS: "0x5dbe7ac885a796a823c7241d190e6a0aa7404b30848465cafa226acccbe01fec::sbuck_saving_vault::skim_base_profits"
}
