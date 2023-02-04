import React, { useEffect, useState } from "react";
import Patient from "../../../config/models/entities/patient.entity";
import PatientCard from "../components/patientCard/PatientCard";
import PatientCreation from "../components/patientCreation/PatientCreation";
import PatientDetailCard from "../components/patientDetailCard/PatientDetailCard";
import { getPatients } from "../services/patients.services";

import "./PatientsPage.css";

let searchParams = {
  page: 0,
  filterByName: "",
  filterByGender: "",
};

const PatientsPage = () => {
  const [patientsList, setPatientsList] = useState<Array<Patient>>([]);
  const [hasNext, setHasNext] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);

  const [patientCardVisible, setPatientCardVisible] = useState<boolean>(false);
  const [patientSelected, setPatientSelected] = useState<Patient | null>(null);

  const [patientCreationVisible, setPatientCreationVisible] =
    useState<boolean>(false);
  const [patientCreated, setPatientCreated] = useState<number | null>(null);

  useEffect(() => {
    let ignore = false;
    console.log("Recargando..");

    const abortController = new AbortController();
    setLoading(true);

    getPatients(searchParams).then((info) => {
      if (info && !ignore) {
        setPatientsList(info.data);
        setHasNext(info.hasNext);
      }
      setLoading(false);
    });

    return function cleanup() {
      ignore = true;
      abortController.abort();
    };
  }, [reload]);

  const handleLoadPage = () => {
    searchParams.page += 1;
    getPatients(searchParams).then((info) => {
      if (info) {
        setPatientsList((prev) => prev.concat(info.data));
        setHasNext(info.hasNext);
      }
      setLoading(false);
    });
  };

  const handleOnChangeNameFilter = (event: any) => {
    setPatientsList([]);
    searchParams.page = 0;
    searchParams.filterByName = event.target.value;
    setReload((prev) => !prev);
  };

  const handleOnChangeGenderFilter = (event: any) => {
    setPatientsList([]);
    searchParams.page = 0;
    searchParams.filterByGender = event.target.value;
    setReload((prev) => !prev);
  };

  const handleViewDetailPatientCard = (patient: Patient) => {
    setPatientSelected(patient);
    setPatientCardVisible(!patientCardVisible);
  };

  const handleOnClosePatientCard = () => {
    setPatientCardVisible(!patientCardVisible);
  };

  const handleOnClosePatientCreation = () => {
    setPatientCreationVisible(!patientCreationVisible);
  };

  const handleOnPatientCreationSuccess = (patient: Patient) => {
    setPatientsList((prev) => prev.concat(patient));
    setPatientCreated(patient.patientId);
    setPatientCreationVisible(!patientCreationVisible);
    setTimeout(() => {
      setPatientCreated(null);
    }, 1500);
  };

  const handleOnPatientDeleted = (patientId: number) => {
    setPatientsList((prev) =>
      prev.filter((patient) => patient.patientId != patientId)
    );
    setPatientCardVisible(false);
  };

  return (
    <>
      <div className="patients-page">
        <div className="patients-page__controls">
          <div className="field">
            <label className="label">Filtrar por nombre</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Text input"
                onChange={handleOnChangeNameFilter}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Filtrar por nombre</label>
            <div className="select">
              <div className="control">
                <select
                  onChange={handleOnChangeGenderFilter}
                  style={{ width: "100%" }}
                >
                  <option value="">Todos</option>
                  <option value="M">Hombre</option>
                  <option value="F">Mujer</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {loading && <h2>Cargando</h2>}
        {!loading && patientsList.length === 0 && (
          <h2>No se encontraron resultados</h2>
        )}

        <div className="patient-page__patient-list">
          {patientsList &&
            patientsList.map((patient) => (
              <PatientCard
                key={`patient-card-${patient.patientId}`}
                patient={patient}
                onClick={() => {
                  handleViewDetailPatientCard(patient);
                }}
                customClass={
                  patient.patientId === patientCreated
                    ? "patient-card-created"
                    : undefined
                }
              />
            ))}
        </div>
        <div className="patients-page__buttons">
          {!loading && hasNext && (
            <button
              className="button is-primary"
              onClick={() => handleLoadPage()}
            >
              <span>Cargar más</span>
            </button>
          )}
          {!loading && (
            <button
              className="button is-success"
              onClick={handleOnClosePatientCreation}
            >
              <span>Agregar</span>
            </button>
          )}
        </div>
      </div>
      {patientSelected && (
        <PatientDetailCard
          visible={patientCardVisible}
          patient={patientSelected}
          onClose={handleOnClosePatientCard}
          onPatientDeleted={handleOnPatientDeleted}
        />
      )}
      <PatientCreation
        visible={patientCreationVisible}
        onClose={handleOnClosePatientCreation}
        onPatientCreateSuccess={handleOnPatientCreationSuccess}
      />
    </>
  );
};

export default PatientsPage;
