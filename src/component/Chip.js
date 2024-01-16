import React, { useState, useEffect, useRef } from "react";
import "./Chips.css";
import items from "../data.json";

const Chip = () => {
  const [inputValue, setInputValue] = useState("");
  const [chipList, setChipList] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [showItemList, setShowItemList] = useState(false);
  const inputRef = useRef(null);
  const [highlightedChip, setHighlightedChip] = useState(null);

  useEffect(() => {
    setFilteredItems(
      items.filter(
        (item) =>
          !chipList.includes(item.name) &&
          item.name.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  }, [inputValue, chipList]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputFocus = () => {
    setShowItemList(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setShowItemList(false);
    }, 200);
  };

  const handleItemSelect = (selectedItem) => {
    setChipList([...chipList, selectedItem]);
    setInputValue("");
  };

  const handleChipRemove = (removedChip) => {
    setChipList(chipList.filter((chip) => chip !== removedChip));
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Backspace" && inputValue === "" && chipList.length > 0) {
      const lastChip = chipList[chipList.length - 1];
      setHighlightedChip(lastChip);
      event.preventDefault();
    }
    if (event.key === "Backspace" && highlightedChip) {
      handleChipRemove(highlightedChip);
      setHighlightedChip(null);
    }
  };

  return (
    <div className="chip-container">
      <div className="chip-input-container">
        {chipList.map((chip, index) => (
          <div
            key={index}
            className={`chip ${highlightedChip === chip ? "highlighted" : ""}`}
          >
            {chip}{" "}
            <span
              onClick={() => handleChipRemove(chip)}
              className="chip-remove"
            >
              X
            </span>
          </div>
        ))}

        <div>
          <input
            type="text"
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder=" Search..."
          />

          {showItemList && inputValue.length < 1 && (
            <div className="item-list">
              {filteredItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleItemSelect(item.name)}
                  className="item"
                >
                  {item.name}
                  {"   "} {item.email}
                </div>
              ))}
            </div>
          )}
          {inputValue.length > 0 && (
            <div className="item-list">
              {filteredItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleItemSelect(item.name)}
                  className="item"
                >
                  {item.name} ({item.email})
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chip;
