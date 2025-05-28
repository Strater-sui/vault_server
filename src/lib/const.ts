export const SLIPPAGE = 0.005;

export const SHARED_OBJECTS = {
  ST_SBUCK_SAVING_VAULT: {
    objectId:
      "0xe83e455a9e99884c086c8c79c13367e7a865de1f953e75bcf3e529cdf03c6224",
    initialSharedVersion: 261896418,
    mutable: true,
  },
  SBUCK_SAVING_VAULT_STRATEGY: {
    objectId:
      "0x55bb4f6737d9a299cae4da7687dcf0ab4f56494dfe6ec1189a388b6018d0c2a8",
    initialSharedVersion: 261896419,
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

  // CETUS
  CETUS_GLOBAL_CONFIG: {
    objectId:
      "0xdaa46292632c3c4d8f31f23ea0f9b36a28ff3677e9684980e4438403a67a3d8f",
    initialSharedVersion: 1574190,
    mutable: false,
  },
  CETUS_USDC_SUI_POOL: {
    objectId:
      "0xcf994611fd4c48e277ce3ffd4d4364c914af2c3cbb05f7bf6facd371de688630",
    initialSharedVersion: 1580450,
    mutable: true,
  },
  // BUCKET
  BUCKET_PROTOCOL_OBJECT: {
    objectId:
      "0x9e3dab13212b27f5434416939db5dec6a319d15b89a84fd074d03ece6350d3df",
    mutable: true,
    initialSharedVersion: 6365975,
  },
};

export const OWNED_OBJECTS = {
  VAULT_ADMIN_CAP:
    "0xa6f908d178d44d037e31e05f9fea6d3f941bd36eeade3e49ea65dfca12414fb2",
  SAVING_VAULT_STRATEGY_CAP:
    "0xb006b238634aaf3f1edaf25bd20b336552941be61771bdfb2ce13f311ec25d53",
};

export const DUMMY_ADDRESS =
  "0x0c434f35a9b9a569e4f6476b6d1dafcc767de25f3d143e864e8ce319df85d052";

const SAVING_VAULT_PACKAGE_ID =
  "0xe3cebd65a961b580068df236d44bc84a2ac6ef2c9dd42df1b07fc6600ab0eeda";

export const TARGETS = {
  // SAVING_VAULT_STRATEGY
  UNDERLYING_PROFITS: `${SAVING_VAULT_PACKAGE_ID}::sbuck_saving_vault::underlying_profits`,
  SKIM_BASE_PROFITS: `${SAVING_VAULT_PACKAGE_ID}::sbuck_saving_vault::skim_base_profits_v1`,
  TAKE_PROFITS_FOR_SELLING: `${SAVING_VAULT_PACKAGE_ID}::sbuck_saving_vault::take_profits_for_selling`,
  DEPOSIT_SOLD_PROFITS: `${SAVING_VAULT_PACKAGE_ID}::sbuck_saving_vault::deposit_sold_profits`,
  REBALANCE: `${SAVING_VAULT_PACKAGE_ID}::sbuck_saving_vault::rebalance_v1`,
  // SAVING_VAULT
  CALC_REBALANCE_AMOUNTS: `${SAVING_VAULT_PACKAGE_ID}::vault::calc_rebalance_amounts`,
  // CETUS
  CETUS_SWAP:
    "0x2d8c2e0fc6dd25b0214b3fa747e0fd27fd54608142cd2e4f64c1cd350cc4add4::router::swap",
  CETUS_CHECK_COIN_THRESHOLD:
    "0x2d8c2e0fc6dd25b0214b3fa747e0fd27fd54608142cd2e4f64c1cd350cc4add4::router::check_coin_threshold",
  // BUCKET
  BUCKET_CHARGE_RESERVOIR:
    "0x0b6ba9889bb71abc5fa89e4ad5db12e63bc331dba858019dd8d701bc91184d79::buck::charge_reservoir",
};

export const COIN_TYPES = {
  BUCK: "0xce7ff77a83ea0cb6fd39bd8748e2ec89a3f41e8efdc3f4eb123e0ca37b184db2::buck::BUCK",
  ST_SBUCK:
    "0xd01d27939064d79e4ae1179cd11cfeeff23943f32b1a842ea1a1e15a0045d77d::st_sbuck::ST_SBUCK",
  SUI: "0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI",
  USDC: "0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN",
};

export const CETUS_PARTNER_ID =
  "0x05940f93c2a5afbdfd3fd089571d0f8b5626d57250f72dd2f24351ec4d8aef51";
