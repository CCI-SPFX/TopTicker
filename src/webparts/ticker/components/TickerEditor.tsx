import * as React from "react";

import { Icon } from "@fluentui/react/lib/Icon";

const TickerEditor: React.FC<{
  tickers: string[];
  onChange: (tickers: string[]) => void;
}> = ({ tickers, onChange }) => {
  const handleAdd = ():void => onChange([...tickers, ""]);
  const handleDelete = (index: number):void => {
    const updated = tickers.filter((_, i) => i !== index);
    onChange(updated);
  };
  const handleChange = (value: string, index: number):void => {
    const updated = [...tickers];
    updated[index] = value;
    onChange(updated);
  };

  return (
    <div>
        <label style={{ fontWeight: "600", marginBottom: "8px", display: "block" }}>
        Ticker Items
      </label>
      {tickers.map((text, index) => (
        <div
          key={index}
          style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
        >
          <input
            type="text"
            value={text}
            onChange={(e) => handleChange(e.target.value, index)}
            style={{ flex: 1, padding: "6px", fontSize: "14px" }}
          />
          <button
            onClick={() => handleDelete(index)}
            style={{ marginLeft: "5px" }}
          >
            <Icon
              iconName="Delete"
              style={{ fontSize: 18, color: "red", cursor: "pointer" }}
            //   onClick={() => alert("Delete clicked!")}
            />
          </button>
          {index === tickers.length - 1 && (
            <button onClick={handleAdd} style={{ marginLeft: "4px" }}>
              ➕
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default TickerEditor;
