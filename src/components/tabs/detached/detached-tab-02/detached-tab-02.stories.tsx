import React from "react";
import { ComponentMeta } from "@storybook/react";
import DetachedTab02, { DetachedTab02Props, TabProps } from "./detached-tab-02";
import { RoundList } from "../../../constantes";
import { FaDatabase, FaLinux, FaCode } from "react-icons/fa";

export default {
  title: "Tabs/Detached/DetachedTab 02",
  component: DetachedTab02,
} as ComponentMeta<typeof DetachedTab02>;

export const Uncontrolled = (
  args: Omit<DetachedTab02Props, "current" | "update">
) => {
  const [current, setCurrent] = React.useState<string>(args.values[0]);
  return (
    <DetachedTab02
      current={current}
      update={setCurrent as (n: string) => void}
      {...args}
    />
  );
};

Uncontrolled.args = {
  values: ["Option A", "Option B", "Option C"],
  rounded: RoundList.XXS,
} as Omit<DetachedTab02Props, "current" | "update">;

export const Controlled = (args: DetachedTab02Props) => (
  <DetachedTab02 {...args} />
);

Controlled.args = {
  values: ["Option A", "Option B", "Option C"],
  update: console.log,
  current: "Option A",
  rounded: RoundList.XXS,
} as DetachedTab02Props;

export const Tnj = Uncontrolled.bind({});
Tnj.args = {
  values: ["Mytimenjoy", "Timenjoy Performance", "Timenjoy Studio"],
  rounded: RoundList.XXS,
  textColor: "#1D293F",
  highlightColor: "#B3CF42",
  lineColor: "#B3CF42",
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
  padding: 4,
  RenderTabs: ({ value, style, update }: TabProps) => {
    const Icone = icones[value as keyof typeof icones];
    return (
      <h4 className="gc m0 f-cc" onClick={() => update(value)} key={value.toString()} style={style}>
        <Icone style={{ marginRight: 8 }} />
        {value}
      </h4>
    );
  },
} as Omit<DetachedTab02Props, "current" | "update">;
