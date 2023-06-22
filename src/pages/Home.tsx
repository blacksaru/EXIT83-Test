/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo, useRef } from "react";
import Header from "../components/Header";
import { NFT } from "../utils/types";
import { fetchNfts } from "../utils/apis";
import NftCard from "../components/NftCard";
import LoadingScreen from "../components/LoadingScreen";
import { FixedSizeGrid as Grid } from "react-window";
import { useWindowSize } from "../utils/util";

const PAGE_SIZE = 20;

function Home() {
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const windowSize = useWindowSize();

  const gridRef = useRef(null);

  useEffect(() => {
    const getNfts = async () => {
      setLoading(true);
      const startIndex = page * PAGE_SIZE;
      const fetchedNfts = await fetchNfts(startIndex);
      setNfts((prevNfts) =>
        page === 0 ? [...fetchedNfts] : [...prevNfts, ...fetchedNfts]
      );
      setLoading(false);
    };
    getNfts();
  }, [page]);

  // filter NFTs by keyword
  const filteredNfts = useMemo(
    () =>
      nfts.filter(
        (nft) =>
          nft.title.toLocaleLowerCase().indexOf(keyword.toLocaleLowerCase()) !==
          -1
      ),
    [nfts, keyword]
  );

  const columnCount = useMemo(() => {
    if (windowSize.width > 1440) {
      return 5;
    } else if (windowSize.width > 1080) {
      return 4;
    } else if (windowSize.width > 840) {
      return 3;
    } else if (windowSize.width > 560) {
      return 2;
    } else {
      return 1;
    }
  }, [windowSize]);

  const rowCount = Math.ceil(filteredNfts.length / columnCount);

  const itemWidth = useMemo(() => {
    return (windowSize.width - 24 * (columnCount + 1)) / columnCount;
  }, [windowSize]);

  const itemHeight = itemWidth + 60;

  // render grid item
  const renderItem = ({ columnIndex, rowIndex, style }: any) => {
    const index = rowIndex * columnCount + columnIndex;
    if (index >= filteredNfts.length) {
      return null;
    }
    const nft = filteredNfts[index];
    return (
      <div
        style={{
          position: "absolute",
          width: style.width,
          height: style.height,
          top: style.top + 24 * rowIndex,
          left: style.left + 24 * columnIndex,
        }}
      >
        <NftCard
          key={index}
          name={nft.title}
          content={nft.content}
          price={nft.price as unknown as number}
          image={nft.img}
          mint={nft.mintAddress}
        />
      </div>
    );
  };

  const handleGridScroll = (event: any) => {
    const deff = itemHeight * (rowCount - 2) - 112 - event.scrollTop;
    if (
      event.verticalScrollDirection === "forward" &&
      deff < 100 &&
      nfts.length >= 20
    ) {
      document.body.style.pointerEvents = "none"; // Disable pointer events
      if (!loading) {
        setPage(page + 1);
      }
      setTimeout(() => {
        document.body.style.pointerEvents = "auto"; // Re-enable pointer events after a short delay
      }, 500);
    }
  };

  return (
    <>
      <Header
        title="NFT List"
        setKeyword={setKeyword}
        keyword={keyword}
        length={filteredNfts.length}
      />
      <LoadingScreen
        loading={loading}
        title={page === 0 ? "Fetching NFTs..." : "Fetching More NFTs..."}
      />
      <div className="bg-[#444] pt-[88px] lg:pt-[112px] min-h-screen">
        <div className="px-4 lg:px-6">
          <Grid
            ref={gridRef}
            columnCount={columnCount}
            rowCount={rowCount}
            columnWidth={itemWidth}
            rowHeight={itemHeight}
            width={windowSize.width - 24}
            height={windowSize.height - 112}
            style={{ paddingBottom: 94 }}
            onScroll={handleGridScroll}
            className="pb-20 scroll-grid"
          >
            {renderItem}
          </Grid>
        </div>
      </div>
    </>
  );
}

export default Home;
