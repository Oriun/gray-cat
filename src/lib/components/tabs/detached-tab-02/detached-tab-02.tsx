import React from "react";
import { RoundList } from "../../constantes";
import { Font } from "../../types";
import "./detached-tab-02.css";

export type TabProps = {
  value: string;
  update: (n: string) => void;
  style: React.CSSProperties;
  current: string;
};

const BasicTab: React.FC<TabProps> = ({ value, update, style }) => {
  return (
    <h4 onClick={() => update(value)} key={value.toString()} style={style}>
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
  lineHeight?: number | string
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
  font = {},
  height = 56,
  minWidth = 100,
  RenderTabs = BasicTab,
  lineColor = "#009bfe",
  lineHeight = 4
}) => {
  const index = (100 * values.indexOf(current)) / values.length;
  return (
    <div
      className="tabs-detached-2"
      style={{ borderRadius: rounded * 1.5 }}
    >
      <div className="background-container">
        <div
          className={"background"}
          style={{
            backgroundColor: lineColor,
            borderRadius: rounded,
            left: index.toFixed(2) + "%",
            width: (100 / values.length).toFixed(2) + "%",
            height: lineHeight
          }}
        />
      </div>
      {values.map((val) => (
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
      ))}
    </div>
  );
};

export default DetachedTab02;
