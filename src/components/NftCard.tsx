/* eslint-disable react-refresh/only-export-components */
import React from "react";
import SolanaIcon from "../assets/solana.svg";

type NftCardProps = {
  mint: string;
  price: number;
  name: string;
  content: string;
  image: string;
};

const NftCard: React.FC<NftCardProps> = ({ price, name, image }) => {
  return (
    <div className="relative">
      <div className="relative w-full before:block before:pb-[100%] bg-[#333]">
        <img
          src={image}
          alt={name}
          className="w-full h-auto absolute left-0 top-0"
          loading="lazy"
        />
      </div>
      <div className="w-full z-10 bg-[#000] flex justify-between items-center p-4">
        <h3 className="text-white text-lg">{name}</h3>
        <p className="text-white font-bold flex items-center">
          <img src={SolanaIcon} className="w-5 h-5 mr-2" alt="" />
          <span>{price}</span>
        </p>
      </div>
    </div>
  );
};

export default NftCard;
