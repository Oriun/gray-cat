import React from "react";
import { RoundList } from "../../../constantes";
import { Font } from "../../../types";
import "./detached-tab-02.css";

import "../../../styles/global.css";
import "../../../styles/size.css";
import "../../../styles/flex.css";
import "../../../styles/grid.css";
import "../../../styles/margin.css";
import "../../../styles/padding.css";
import "../../../styles/position.css";
import "../../../styles/transition.css";

export type TabProps = {
  value: string;
  update: (n: string) => void;
  style: React.CSSProperties;
  current: string;
};

const BasicTab: React.FC<TabProps> = ({ value, update, style }) => {
  return (
    <h4
      className="gc z1 f-cc m0 ta-c ptr td1"
      onClick={() => update(value)}
      key={value.toString()}
      style={style}
    >
      {value}
    </h4>
  );
};

export interface DetachedTab02Props {
  update: (n: string) => void;
  values: string[];
  current: string;
  rounded?: number | RoundList;
  textColor?: string;
  highlightColor?: string;
  lineColor?: string;
  lineHeight?: number | string;
  font?: Font;
  height?: number | string;
  minWidth?: number | string;
  RenderTabs?: typeof BasicTab;
}
const DetachedTab02: React.FC<DetachedTab02Props> = ({
  update,
  values,
  current,
  rounded = RoundList.XL,
  textColor = "#4a4a4a",
  highlightColor = "#009bfe",
  font = {
    fontWeight: 600,
    fontSize: 14,
  },
  height = 56,
  minWidth = 100,
  RenderTabs = BasicTab,
  lineColor = "#009bfe",
  lineHeight = 4,
}) => {
  const index = (100 * values.indexOf(current)) / values.length;
  return (
    <div
      className="tabs-detached-2 gc w-fc rel g gaf-c gac-1fr -us gai-c"
      style={{ borderRadius: rounded * 1.5 }}
    >
      <div className="gc abs i0 z0">
        <div
          className="gc abs z0 b0 td4"
          style={{
            backgroundColor: lineColor,
            borderRadius: rounded,
            left: index.toFixed(2) + "%",
            width: (100 / values.length).toFixed(2) + "%",
            height: lineHeight,
          }}
        />
      </div>
      {values.map((val) => (
        <div className="tab gc z1 m0 f-cc ptr td2" style={{ minWidth, height }}>
          <RenderTabs
            value={val}
            current={current}
            update={update}
            style={{
              color: val === current ? highlightColor : textColor,
              ...font,
              height,
              minWidth,
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default DetachedTab02;
