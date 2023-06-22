import axios from "axios";
import { NFT } from "./types";

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

export const fetchNfts = async (page?: number): Promise<NFT[]> => {
  let retries = 0;

  while (retries < MAX_RETRIES) {
    try {
      const response = await axios.get(
        `https://api-mainnet.magiceden.io/idxv2/getListedNftsByCollectionSymbol?collectionSymbol=okay_bears&limit=20&offset=${page ? page : 0}`
      );

      return response.data.results;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { status } = error.response;

        if (status === 429) {
          console.log('Rate limited. Retrying in a moment...');
          await wait(RETRY_DELAY_MS);
        } else {
          console.log(`API request failed with status ${status}`);
          throw error; // Rethrow the error if it's not a rate limit issue
        }
      } else {
        console.log('API request failed. Retrying in a moment...');
        await wait(RETRY_DELAY_MS);
      }
    }

    retries++;
  }

  throw new Error('Max retries exceeded. Unable to fetch data.');
};

const wait = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
