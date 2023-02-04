import React from "react";
import Patient from "../../../../config/models/entities/patient.entity";

import "./PatientCard.css";

type Props = {
  patient: Patient;
  onClick: () => void;
  customClass?: string;
};

const PatientCard = ({ patient, onClick, customClass }: Props) => {
  if (!patient) return null;

  return (
    <div
      className={`patient-card ${customClass ? customClass : ""}`}
      style={{
        backgroundColor:
          patient.gender?.toString() === "F" ? "#F374C0" : "#3e8ed0",
      }}
      onClick={onClick}
    >
      <div className="patient-card__image"></div>
      <div className="patient-card__info">
        <p>{patient.lastName}</p>
        <p>{patient.firstName}</p>
      </div>
    </div>
  );
};

export default PatientCard;
