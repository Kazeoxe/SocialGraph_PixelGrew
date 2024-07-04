import React, { useState } from "react";
import {
  Input,
  IconButton,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const SearchBar = ({ handleSearch, setSearchTerm, searchTerm, showLegend }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div
      className={`legendWrapper ${!showLegend ? "hidden" : ""}`}
      style={{ margin: "0 10px 12px 10px", display: "flex" }}
    >
      <Input
        type="text"
        size="sm"
        color="white"
        width="auto"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search a player..."
        onKeyDown={handleKeyPress}
      />

      <IconButton
        style={{
          color: "#1B1714",
        }}
        size="sm"
        icon={<SearchIcon />}
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
