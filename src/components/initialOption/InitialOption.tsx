import React from "react";
import { useNavigate } from "react-router-dom";
import "./InitialOption.css";

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
      className="initial-option"
      onClick={handleClick}
    >
      <h1>{props.optionName}</h1>
    </div>
  );
};

export default InitialOption;
