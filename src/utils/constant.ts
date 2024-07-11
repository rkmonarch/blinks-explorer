export const Tags = [
    'NFTs',
    'DEFI',
    'INFRASTRUCTURE',
    'SWAP',
    'AIRDROP',
    'SOCIAL',
    'STAKING',
    'TRADING',
    'GAMES',
    'VOTING',
    'DAO',
    'MEMES'
]

export function isValidURL(string: string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}