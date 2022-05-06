import React, { useEffect } from "react";
import { ComponentMeta } from "@storybook/react";
import AllMightyButton, { AllMightyButtonProps } from "./all-mighty-button";
import { RoundList } from "../../constantes";
import { FaCode } from "react-icons/fa";
// import { FaCode } from "react-icons/fa";

export default {
  title: "Buttons/Special/AllMightyButton",
  component: AllMightyButton,
} as ComponentMeta<typeof AllMightyButton>;

export const Uncontrolled = () => {
  const [current, setCurrent] = React.useState<boolean>(false);
  const loadRef = React.useRef<number | null>(null);
  const duration = 3
  useEffect(() => {
    if (current) {
      loadRef.current = setTimeout(() => {
        loadRef.current = null;
        setCurrent(false);
      }, duration * 1_000) as unknown as number;
      return () => {
        loadRef.current !== null && clearTimeout(loadRef.current);
      };
    }
  }, [current]);
  return (
    <AllMightyButton
      loading={current}
      onClick={() => setCurrent((a) => !a)}
      content="BOUTON"
      duration={duration}
    />
  );
};


export const Controlled = (args: AllMightyButtonProps) => (
  <AllMightyButton {...args} />
);

Controlled.args = {
  content: <><FaCode/> Click</>,
  duration: 5,
  loading: true,
  onClick: console.log
} as AllMightyButtonProps;