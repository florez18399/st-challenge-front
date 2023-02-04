import React from "react";
import InitialOption from "../../components/initialOption/InitialOption";

import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <h1 className="home-header">Bienvenidos</h1>
      <div className="home__options">
        {/* <InitialOption optionName="Medicamentos" route="/medicines" /> */}
        <InitialOption optionName="Pacientes" route="/patients" />
      </div>
    </div>
  );
};

export default Home;
