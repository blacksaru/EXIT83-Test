interface OnChainCollection {
    key: string;
    verified: number;
    data: {
        name: string;
        image: string;
        description: string;
    };
}

interface Creator {
    address: string;
    verified: number;
    share: number;
}

interface Moonrank {
    rank: number;
    absolute_rarity: number;
    crawl: Record<string, unknown>;
}

interface Merarity {
    rank: number;
    tokenKey: string;
    score: number;
}

interface Rarity {
    moonrank: Moonrank;
    merarity: Merarity;
}

interface ListingUpdatedAt {
    updatedAt: string;
    slot: number;
}

export interface NFT {
    mintAddress: string;
    supply: number;
    title: string;
    content: string;
    primarySaleHappened: boolean;
    updateAuthority: string;
    onChainCollection: OnChainCollection;
    sellerFeeBasisPoints: number;
    creators: Creator[];
    price: number;
    escrowPubkey: string;
    owner: string;
    v2: {
        auctionHouseKey: string;
        sellerReferral: string;
        expiry: number;
    };
    id: string;
    tokenDelegateValid: boolean;
    isFrozen: boolean;
    tokenStandard: number;
    img: string;
    attributes: Array<{
        trait_type: string;
        value: string;
    }>;
    externalURL: string;
    collectionName: string;
    collectionTitle: string;
    isTradeable: boolean;
    rarity: Rarity;
    listingType: string;
    listingUpdatedAt: ListingUpdatedAt;
    createdAt: string;
    updatedAt: string;
}
