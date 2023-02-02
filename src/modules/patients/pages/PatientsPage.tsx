import React, { useEffect, useState } from "react";
import GetPatientsResponse from "../../../config/models/dtos/getPatientsResponse.dto";
import PatientCard from "../components/patientCard/PatientCard";
import { getPatients } from "../services/patients.services";

const PatientsPage = () => {
  const [patientsData, setPatientsData] = useState<GetPatientsResponse | null>(
    null
  );

  useEffect(() => {
    const abortController = new AbortController();
    getPatients().then((data) => {
      if (data) {
        setPatientsData(data);
      }
    });

    return function () {
      abortController.abort();
    };
  }, []);

  return (
    <div>
      <h1>Patients Page</h1>
      <div>
        {patientsData &&
          patientsData.data &&
          patientsData.data.map((patient) => (
            <PatientCard
              key={`patient-card-${patient.patientId}`}
              patient={patient}
            />
          ))}
      </div>
    </div>
  );
};

export default PatientsPage;
