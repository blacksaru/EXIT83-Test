/* eslint-disable @typescript-eslint/ban-types */
import React from "react";
import { Link } from "react-router-dom";

interface HeaderProps {
  keyword: string;
  length: number;
  setKeyword: Function;
  title?: string;
}

const Header: React.FC<HeaderProps> = React.memo(
  ({ keyword, setKeyword, title, length }: HeaderProps) => {
    return (
      <header className="bg-[#333] px-4 lg:px-6 py-2 lg:py-4 fixed z-50 w-full">
        <div className="container mx-auto flex items-center justify-between">
          <Link
            to="/"
            title={title}
            className="text-white font-bold text-3xl hidden sm:block"
          >
            NFT List ({length})
          </Link>
          <div className="flex items-center py-2 w-full sm:w-auto">
            <input
              className="h-10 border-[1px] border-[#ddd] bg-transparent py-2 px-4 rounded-md w-full sm:w-[300px] placeholder:text-[#eee] text-white"
              placeholder="Search NFT name"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
        </div>
      </header>
    );
  }
);

export default Header;
