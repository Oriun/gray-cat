import React from "react";
import { RoundList } from "../../../constantes";
import { Font } from "../../../types";
import "./detached-tab-01.css";

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

export interface DetachedTab01Props {
  update: (n: string) => void;
  values: string[];
  current: string;
  rounded?: number | RoundList;
  primaryColor?: string;
  secondaryColor?: string;
  textColor?: string;
  highlightColor?: string;
  font?: Font;
  height?: number | string;
  minWidth?: number | string;
  RenderTabs?: typeof BasicTab;
  padding?:
    | number
    | {
        top: number | string;
        right?: number | string;
        bottom?: number | string;
        left?: number | string;
      };
}
const DetachedTab01: React.FC<DetachedTab01Props> = ({
  update,
  values,
  current,
  rounded = RoundList.XL,
  primaryColor = "#fff",
  secondaryColor = "#f5f6f8",
  textColor = "#a0a0a0",
  highlightColor = "#4a4a4a",
  font = {},
  height = 56,
  minWidth = 200,
  RenderTabs = BasicTab,
  padding = 10,
}) => {
  const index = (100 * values.indexOf(current)) / values.length;
  const pad = function (type: "padding" | "inset") {
    if (typeof padding === "number") return { [type]: padding };

    const val = {
      top: padding.top,
      right: padding.right ?? padding.top,
      left: padding.left ?? padding.right ?? padding.top,
      bottom: padding.bottom ?? padding.top,
    };

    if (type === "inset") return val;

    return {
      paddingTop: val.top,
      paddingRight: val.top,
      paddingBottom: val.top,
      paddingLeft: val.top,
    };
  };
  return (
    <div
      className="tabs-detached-1"
      style={{
        backgroundColor: secondaryColor,
        borderRadius: rounded * 1.5,
        ...pad("padding")
      }}
    >
      <div className="background-container" style={pad("inset")}>
        <div
          className={"background"}
          style={{
            backgroundColor: primaryColor,
            borderRadius: rounded,
            left: index.toFixed(2) + "%",
            width: (100 / values.length).toFixed(2) + "%",
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

export default DetachedTab01;
