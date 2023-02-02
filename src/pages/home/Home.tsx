import React from "react";
import InitialOption from "../../components/initialOption/InitialOption";

const Home = () => {
  return (
    <div>
      <h1>Bienvenidos</h1>
      <InitialOption optionName="Medicamentos" route="/medicines" />
      <InitialOption optionName="Pacientes" route="/patients" />
    </div>
  );
};

export default Home;
