import React, { createContext, useContext, useRef, useState } from "react";

interface SearchContextType {
  searchValue: string;
  setSearchValue: (s: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

const SearchContext = createContext<SearchContextType>({
  searchValue: "",
  setSearchValue: () => {},
  inputRef: { current: null },
});

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue, inputRef }}>
      {children}
    </SearchContext.Provider>
  );
};
