export const toShortString = (walletAddress: string): string => {
    const firstSixCharacters = walletAddress?.slice(0, 6);
    const lastFourCharacters = walletAddress?.slice(-4);

    return `${firstSixCharacters}...${lastFourCharacters}`;
};

export const toShortStringWithChain = (walletAddress: string, chain: string) => `${toShortString(walletAddress)} (${chain})`;
