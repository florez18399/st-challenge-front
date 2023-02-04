import React from "react";
import Prescription from "../../../../config/models/entities/prescription.entity";

import './PrescriptionCard.css'

type Props = {
  prescription: Prescription;
};

const PrescriptionCard = ({ prescription }: Props) => {
  return (
    <div className="prescription-card">
      <h1>{prescription.medicine.name}</h1>
      <h1>{prescription.prescriptionDate.toString()}</h1>
    </div>
  );
};

export default PrescriptionCard;
