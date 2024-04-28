import React, { useState } from "react";
import "./search.css"; 
import { Search } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

export default function SearchComponent({
  onSearchChange,
  onSearchClick,
  isLoading,
}) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
    onSearchChange(value); 
  };

  const handleSearchClick = () => {
    onSearchClick(inputValue); 
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearchClick(inputValue);
    }
  };

  return (
    <div className="search">
      <div className="search-icon" onClick={handleSearchClick}>
        <Search />
      </div>
      
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="חיפוש"
        onKeyDown={handleKeyDown}
        className="word-dec"
      />

    </div>
  );
}
