// export const Tags = [
//     'NFTs',
//     'DEFI',
//     'INFRASTRUCTURE',
//     'SWAP',
//     'AIRDROP',
//     'SOCIAL',
//     'STAKING',
//     'TRADING',
//     'GAMES',
//     'VOTING',
//     'DAO',
//     'MEMES'
// ]

export const Tags = [
  "DEXs",
  "Perps",
  "Lending",
  "Yield",
  "Liquid Staking",
  "Stables",
  "RWAs",
  "DEX Aggs",
  "CEXs",
  "Restaking",
  "Memecoins",
  "NFTs",
  "Gaming",
  "Creator Platforms",
  "Blinks",
  "DePIN",
  "Community",
  "Payments",
  "Wallets",
  "InterOp",
  "Dev Tooling",
  "Oracles",
  "Nodes",
  "Scaling",
  "Compute",
  "Analytics",
];

export function isValidURL(string: string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}
