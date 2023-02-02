import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  optionName: string;
  route: string;
};

const InitialOption = (props: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(props.route);
  };

  return (
    <div
      style={{
        backgroundColor:
          "#" + (((1 << 24) * Math.random()) | 0).toString(16).padStart(6, "0"),
      }}
      onClick={handleClick}
    >
      <h1>{props.optionName}</h1>
    </div>
  );
};

export default InitialOption;
