import React from "react";
import { ComponentMeta } from "@storybook/react";
import DetachedTab01, { DetachedTab01Props, TabProps } from "./detached-tab-01";
import { RoundList } from "../../constantes";
import { FaDatabase, FaLinux, FaCode } from "react-icons/fa";

export default {
  title: "DetachedTab 01",
  component: DetachedTab01,
} as ComponentMeta<typeof DetachedTab01>;

export const Uncontrolled = (
  args: Omit<DetachedTab01Props, "current" | "update">
) => {
  const [current, setCurrent] = React.useState<string>(args.values[0]);
  return (
    <DetachedTab01
      current={current}
      update={setCurrent as (n: string) => void}
      {...args}
    />
  );
};

Uncontrolled.args = {
  values: ["Facturation mensuelle", "Facturation annuelle"],
  rounded: RoundList.XL,
  primaryColor: "#fff",
  secondaryColor: "#f5f6f8",
  textColor: "#a0a0a0",
  highlightColor: "#4a4a4a",
} as Omit<DetachedTab01Props, "current" | "update">;

export const Controlled = (args: DetachedTab01Props) => (
  <DetachedTab01 {...args} />
);

Controlled.args = {
  values: ["Facturation mensuelle", "Facturation annuelle"],
  update: console.log,
  current: "Facturation mensuelle",
  rounded: RoundList.XL,
  primaryColor: "#fff",
  secondaryColor: "#f5f6f8",
  textColor: "#a0a0a0",
  highlightColor: "#4a4a4a",
} as DetachedTab01Props;

export const Tnj = Uncontrolled.bind({});
Tnj.args = {
  values: ["Mensuel", "Annuel"],
  rounded: RoundList.XXS,
  primaryColor: "#90A0B7E0",
  secondaryColor: "#E4E4E46E",
  textColor: "#848484",
  highlightColor: "#fff",
  height: 25,
  minWidth: 80,
  font: {
    fontSize: 10,
    fontWeight: 600,
    lineHeight: 28,
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
  rounded: RoundList.L,
  primaryColor: "#90A0B7E0",
  secondaryColor: "#E4E4E46E",
  textColor: "#848484",
  highlightColor: "#fff",
  height: 56,
  minWidth: 120,
  font: {
    fontSize: 24,
    fontWeight: 600,
    lineHeight: 28,
  },
  RenderTabs: ({ value, current, style, update }: TabProps) => {
    const Icone = icones[value as keyof typeof icones];
    return (
      <h4 onClick={() => update(value)} key={value.toString()} style={style}>
        <Icone style={{ marginRight: 8 }} />
        {value}
      </h4>
    );
  },
} as Omit<DetachedTab01Props, "current" | "update">;
