import React from "react";
import { ComponentMeta } from "@storybook/react";
import DetachedTab03, { DetachedTab03Props, TabProps } from "./detached-tab-03";
import { RoundList } from "../../../constantes";
import { FaDatabase, FaLinux, FaCode } from "react-icons/fa";

export default {
  title: "Tabs/Detached/DetachedTab 03",
  component: DetachedTab03,
} as ComponentMeta<typeof DetachedTab03>;

export const Uncontrolled = (
  args: Omit<DetachedTab03Props, "current" | "update">
) => {
  const [current, setCurrent] = React.useState<string>(args.values[0]);
  return (
    <DetachedTab03
      current={current}
      update={setCurrent as (n: string) => void}
      {...args}
    />
  );
};

Uncontrolled.args = {
  values: ["Option A", "Option B", "Option C"],
  rounded: RoundList.XXS,
} as Omit<DetachedTab03Props, "current" | "update">;

export const Controlled = (args: DetachedTab03Props) => (
  <DetachedTab03 {...args} />
);

Controlled.args = {
  values: ["Option A", "Option B", "Option C"],
  update: console.log,
  current: "Option A",
  rounded: RoundList.XXS,
} as DetachedTab03Props;

export const Tnj = Uncontrolled.bind({});
Tnj.args = {
  values: ["Mytimenjoy", "Timenjoy Performance", "Timenjoy Studio"],
  rounded: RoundList.XXS,
  textColor: "#1D293F",
  highlightColor: "#B3CF42",
  lineColor: "#B3CF42",
  lineHeight: 4,
  // height: 56,
  font: {
    fontSize: 18,
    fontWeight: 500,
    lineHeight: '141%',
  },
};

export const CustomTabs = Uncontrolled.bind({});
const icones = {
  Database: FaDatabase,
  "Operating System": FaLinux,
  Software: FaCode,
};
CustomTabs.args = {
  values: ["Database", "Operating System", "Software"],
  rounded: RoundList.XXS,
  RenderTabs: React.forwardRef(({ value, style, update }, ref) => {
    const Icone = icones[value as keyof typeof icones];
    return (
      <h4 onClick={() => update(value)} key={value.toString()} style={style} ref={ref} className="gc m0">
        <Icone style={{ marginRight: 8 }} />
        {value}
      </h4>
    );
  }),
} as Omit<DetachedTab03Props, "current" | "update">;
