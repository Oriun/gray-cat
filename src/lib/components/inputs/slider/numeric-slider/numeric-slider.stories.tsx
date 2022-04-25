import React from "react";
import { ComponentMeta } from "@storybook/react";
import NumericSlider, { NumericSliderProps } from "./numeric-slider";

export default {
  title: "Inputs/Slider/NumericSlider",
  component: NumericSlider,
} as ComponentMeta<typeof NumericSlider>;

export const Uncontrolled = (
  args: Omit<NumericSliderProps, "value" | "update">
) => {
  const [value, setValue] = React.useState<number>(10);
  return <NumericSlider value={value} update={setValue} {...args} />;
};
Uncontrolled.args = {
  from: 0,
  to: 100,
  step: 1,
  min: 0,
  max: 100,
  color: "#009bfe",
};
export const Controlled = (args: NumericSliderProps) => (
  <NumericSlider {...args} />
);

Controlled.args = {
  value: 10,
  update: console.log,
  from: 0,
  to: 100,
  step: 1,
  min: 0,
  max: 100,
  color: "#009bfe",
};

