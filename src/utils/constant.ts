export const Tags = [
  "NFTs",
  "DEFI",
  "DAO",
  "Tokens",
  "Social",
  "Prediction Market",
  "Swap",
  "Donations",
  "Trade",
  "Airdrop",
  "Votes",
  "Memes",
  "Staking",
  "Token gated",
  "Games"
];

export function isValidURL(string: string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}
