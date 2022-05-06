import React from "react";
import "./all-mighty-button.css";

export type AllMightyButtonProps = {
  loading: boolean;
  onClick: () => void;
  content: React.ReactNode;
  duration?: number;
};

const AllMightyButton: React.FC<AllMightyButtonProps> = ({
  loading = false,
  content,
  onClick,
  duration = 10,
}) => {
  const button = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (button.current) {
      button.current.style.setProperty("--amb-duration", duration + "s");
    }
  }, [duration]);
  return (
    <button
      onClick={() => onClick()}
      className={"gc amb " + (loading ? "loading" : "")}
      ref={button}
    >
      {content}
    </button>
  );
};

export default AllMightyButton;
