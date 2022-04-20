import React from "react";
import "./numeric-slider.css";

export interface NumericSliderProps {
  update: (n: number) => void;
  value: number;
  from?: number;
  to?: number;
  min?: number;
  max?: number;
  step?: number;
  color?: string;
}
const NumericSlider: React.FC<NumericSliderProps> = ({
  update,
  value,
  from = 0,
  to = 100,
  min = 0,
  max = 100,
  step = 1,
  color = "#009bfe"
}) => {
  const cursor = React.useRef<HTMLDivElement>(null);
  const bar = React.useRef<HTMLDivElement>(null);
  const [isSliding, setSliding] = React.useState(false);
  function push(event: { clientX: number }) {
    if (!bar.current) return;
    const { x: barX, width: barWidth } = bar.current.getBoundingClientRect();
    const { clientX: mouseX } = event;
    const ratio = (mouseX - barX) / barWidth;
    const toValue = ratio * (to - from);
    const valueWithStep = Math.round(toValue / step) * step;
    const withBounds = Math.max(min, Math.min(max, valueWithStep));
    if (Number.isNaN(toValue) || value === withBounds) return;
    update(withBounds);
  }
  React.useEffect(() => {
    if (!cursor.current || !bar.current || !isSliding) return;
    const currentBar = bar.current;
    const currentCursor = cursor.current;
    document.body.style.cursor =
      currentBar.style.cursor =
      currentCursor.style.cursor =
        "ew-resize";
    window.addEventListener("mousemove", push);
    window.addEventListener("mouseup", () => setSliding(false));
    return () => {
      window.removeEventListener("mousemove", push);
      document.body.style.cursor =
        currentBar.style.cursor =
        currentCursor.style.cursor =
          "";
    };
  }, [isSliding, value]);
  const progress = ((Math.max(Math.min(value, max),min) - from) * 100) / (to - from);
  return (
    <div className="slider" onClick={push}>
      <div className="bar" ref={bar}>
        <div
          className="current"
          style={{ width: `calc(${progress}% + ${12 - (progress / 100) * 24}px - 10px)`, backgroundColor: color }}
        />
      </div>
      <div
        className="cursor"
        ref={cursor}
        style={{ left: `calc(${progress}% + ${12 - (progress / 100) * 24}px - 12px)`, backgroundColor: color }}
        onMouseDown={() => setSliding(true)}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};

export default NumericSlider;
