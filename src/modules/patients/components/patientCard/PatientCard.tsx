import React from "react";
import Patient from "../../../../config/models/entities/patient.entity";

type Props = {
  patient: Patient;
};

const PatientCard = ({ patient }: Props) => {
  return (
    <div>
      <h1>Patient Card</h1>
      <h2>{patient.firstName}</h2>
      <h2>{patient.lastName}</h2>
    </div>
  );
};

export default PatientCard;
