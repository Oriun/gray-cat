import React from "react";
import { RoundList } from "../../../constantes";
import { Font } from "../../../types";
import "./detached-tab-03.css";

import '../../../styles/global.css'
import '../../../styles/size.css'
import '../../../styles/flex.css'
import '../../../styles/grid.css'
import '../../../styles/margin.css'
import '../../../styles/padding.css'
import '../../../styles/position.css'
import '../../../styles/transition.css'

export type TabProps = {
  value: string;
  update: (n: string) => void;
  style: React.CSSProperties;
  current: string;
};

const BasicTab = React.forwardRef<any, TabProps>(
  ({ value, update, style }, ref) => {
    return (
      <h4
        onClick={() => update(value)}
        key={value.toString()}
        style={style}
        ref={ref}
        className="gc m0 w-fc"
      >
        {value}
      </h4>
    );
  }
);

export interface DetachedTab03Props {
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
const DetachedTab03: React.FC<DetachedTab03Props> = ({
  update,
  values,
  current,
  rounded = RoundList.XL,
  textColor = "#4a4a4a",
  highlightColor = "#009bfe",
  font = {
    fontWeight:600,
    fontSize: 14,
    lineHeight: '121%'
  },
  height = 56,
  minWidth = 100,
  RenderTabs = BasicTab,
  lineColor = "#009bfe",
  lineHeight = 4,
}) => {
  const index = values.indexOf(current);
  const ref = React.useRef<HTMLElement[]>([]);
  const [, reload] = React.useState<number>();
  const tab = React.useRef<HTMLDivElement>(null);
  function updateRef(i: number) {
    return function (value: HTMLElement) {
      if(ref.current.length < values.length){
        ref.current[i] = value;
        reload(Date.now())
      }
      else ref.current[i] = value;
    };
  }
  function getSize(): React.CSSProperties {
    if (tab.current === null || index < 0 || index >= ref.current.length)
      return { left : 0, width: 0 }
    const { x: tabX } = tab.current.getBoundingClientRect();
    const { x, width } = ref.current[index].getBoundingClientRect();
    return { left : (x - tabX) + "px", width };
  }
  return (
    <div className="tabs-detached-3 gc g gac-1fr gaf-c w-fc rel -us gai-c" style={{ borderRadius: rounded * 1.5 }} ref={tab}>
        <div
          className="gc abs z0 b0 td4"
          style={{
            backgroundColor: lineColor,
            borderRadius: rounded,
            ...getSize(),
            height: lineHeight,
          }}
        />
      {values.map((val, i) => (
        <div className="tab gc z1 m0 f-cc ptr td2" style={{ minWidth, height }}>
          <RenderTabs
            key={val}
            value={val}
            current={current}
            update={update}
            style={{
              color: val === current ? highlightColor : textColor,
              ...font
            }}
            ref={updateRef(i)}
          />
        </div>
      ))}
    </div>
  );
};

export default DetachedTab03;
