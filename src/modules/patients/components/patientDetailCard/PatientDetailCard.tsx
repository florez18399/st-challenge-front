import React, { useEffect, useState } from "react";
import QuestionModal from "../../../../components/questionModal/QuestionModal";
import Swal from "sweetalert2";
import Patient from "../../../../config/models/entities/patient.entity";
import Prescription from "../../../../config/models/entities/prescription.entity";
import {
  deletePatient,
  getPatientPrescriptions,
} from "../../services/patients.services";
import PrescriptionCard from "../prescriptionCard/PrescriptionCard";
import PrescriptionCreation from "../prescriptionCreation/PrescriptionCreation";

import "./PatientDetailCard.css";

type Props = {
  visible: boolean;
  patient: Patient;
  onClose: () => void;
  onPatientDeleted: (patientId: number) => void;
};

const PatientDetailCard = ({
  visible,
  onClose,
  patient,
  onPatientDeleted,
}: Props) => {
  const [patientPrescriptions, setPatientPrescriptions] = useState<
    Array<Prescription>
  >([]);

  const [prescriptionCreationVisible, setPrescriptionCreationVisible] =
    useState<boolean>(false);

  const [patientDeletionVisible, setPatientDeletionVisible] =
    useState<boolean>(false);

  useEffect(() => {
    let ignore = false;
    const abortController = new AbortController();

    getPatientPrescriptions(patient.patientId).then((info) => {
      if (info && !ignore) {
        setPatientPrescriptions(info);
      }
    });

    return function cleanup() {
      ignore = true;
      abortController.abort();
    };
  }, [patient]);

  const handleOpenClosePrescriptionCreation = () => {
    setPrescriptionCreationVisible(!prescriptionCreationVisible);
  };

  const handleOnPrescriptionSuccess = (prescription: Prescription) => {
    setPatientPrescriptions((prev) => prev.concat(prescription));
    setPrescriptionCreationVisible(!prescriptionCreationVisible);
    Swal.fire({
      title: "Añadida!",
      text: "Medicina prescrita con éxito",
      icon: "success",
      confirmButtonText: "Ok",
    });
  };

  const handleOnDeleteVisible = () => {
    setPatientDeletionVisible(!patientDeletionVisible);
  };

  const handlePatientDeletion = (patientId: number) => {
    console.log("Eliminando paciente");

    deletePatient(patientId)
      .then((data) => {
        console.log(data);
        Swal.fire({
          title: "Eliminado!",
          text: "El paciente se eliminó correctamente",
          icon: "success",
          confirmButtonText: "Ok",
        });
        onPatientDeleted(patientId);
      })
      .catch((error) => {
        Swal.fire({
          title: "Fallo en la eliminación!",
          text: error.message,
          icon: "warning",
          confirmButtonText: "Ok",
        });
      });

    setPatientDeletionVisible(!patientDeletionVisible);
  };

  if (!visible) return null;

  return (
    <>
      {visible && (
        <>
          <div className="modal" style={{ display: "flex" }}>
            <div className="modal-background"></div>
            <div className="modal-card patient_card">
              <header className="modal-card-head">
                <p className="modal-card-title" style={{ textAlign: "left" }}>
                  {patient.firstName + " " + patient.lastName}
                </p>
                <button
                  className="delete"
                  aria-label="close"
                  onClick={onClose}
                ></button>
              </header>
              <section className="modal-card-body">
                <div className="patient_card__info">
                  <div className="patient_card__info__data">
                    <p>
                      <span className="patient_card__info__data-title">
                        Nombre:{" "}
                      </span>
                      {patient.firstName}
                    </p>
                    <p>
                      <span className="patient_card__info__data-title">
                        Apellido:{" "}
                      </span>
                      {patient.lastName}
                    </p>
                    <p>
                      <span className="patient_card__info__data-title">
                        Fecha de nacimiento:{" "}
                      </span>
                      {patient.birthDate.toString()}
                    </p>
                    <p>
                      <span className="patient_card__info__data-title">
                        Género:{" "}
                      </span>
                      {patient.gender?.toString() === "F" ? "Mujer" : "Hombre"}
                    </p>
                  </div>

                  <div className="patient_card__controls">
                    <div className="control">
                      <button
                        className="button is-link is-fullwidth"
                        type="button"
                        disabled
                      >
                        Actualizar Paciente
                      </button>
                    </div>
                    <div className="control">
                      <button
                        className="button is-danger is-fullwidth"
                        type="button"
                        onClick={handleOnDeleteVisible}
                      >
                        Eliminar Paciente
                      </button>
                    </div>
                  </div>
                </div>
                <hr className="solid" />
                <div className="patient_card__prescriptions">
                  <h4>Prescipciones</h4>
                  {patientPrescriptions &&
                    patientPrescriptions.length === 0 && (
                      <h5>No se han realizado prescripciones</h5>
                    )}
                  {patientPrescriptions &&
                    patientPrescriptions.length > 0 &&
                    patientPrescriptions.map((prescription) => (
                      <PrescriptionCard
                        key={prescription.prescriptionId}
                        prescription={prescription}
                      />
                    ))}
                </div>
                {!prescriptionCreationVisible && (
                  <div
                    className="control"
                    onClick={handleOpenClosePrescriptionCreation}
                  >
                    <button className="button is-link" type="submit">
                      Prescribir medicina
                    </button>
                  </div>
                )}

                {prescriptionCreationVisible && (
                  <PrescriptionCreation
                    visible={prescriptionCreationVisible}
                    patientId={patient.patientId}
                    onClose={handleOpenClosePrescriptionCreation}
                    onPrescriptionSucces={handleOnPrescriptionSuccess}
                  />
                )}
                {patientDeletionVisible && (
                  <QuestionModal
                    title="Eliminación de paciente"
                    onCancel={handleOnDeleteVisible}
                    onSubmit={() => handlePatientDeletion(patient.patientId)}
                    question="¿Estás seguro de que deseas eliminar al paciente?"
                    submitButtonClass="is-danger"
                  />
                )}
              </section>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PatientDetailCard;
