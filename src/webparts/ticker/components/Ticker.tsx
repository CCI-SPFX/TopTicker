import * as React from "react";
// import styles from './Ticker.module.scss';
import type { ITickerProps } from "./ITickerProps";
import icon from "../assets/alert.png"

import "./style.css";



const Ticker = ({
  tickersList,
  // tickersItem,
  tickerTitleIcon,
  titleIconUrl,
  titleIconSize,
  tickerTitle,
  tickerTitleSize,
  tickerTitleBGColor,
  tickerTitleColor,
  tickersBGColor,
  tickersTextColor,
  tickersTextSize,
  tickerAnimationSpeed,
}: ITickerProps): JSX.Element => { 
  return (
    <div className="tickerContainer">
      <div
        className="tickerTitle"
        style={{ backgroundColor: tickerTitleBGColor }}
      >
        <img
          src={titleIconUrl?.trim() !== "" ? titleIconUrl : icon}
          
          style={{
            width: titleIconSize,
            display: tickerTitleIcon === true ? "block" : "none",
          }}
          alt="Icon"
        />
        <h5
          style={{
            fontSize: tickerTitleSize,
            color: tickerTitleColor,
          }}
        >
          {tickerTitle === "" ? "Title": tickerTitle} 
        </h5>
      </div>
      <div className="newsTicker" style={{ backgroundColor: tickersBGColor }}>
        <p 
          style={{
            fontSize: tickersTextSize,
            color: tickersTextColor,
            animationDuration: tickerAnimationSpeed,
          }}
        >
          {tickersList.length === 0 ? (
            <span className="story">No ticker items added yet.</span>
          ) : (
            tickersList.map((item, index) => (
              <span className="story" key={index}>
                {item}
              </span>
            ))
          )}
        </p>
      </div>
    </div>
  );
};

export default Ticker;
