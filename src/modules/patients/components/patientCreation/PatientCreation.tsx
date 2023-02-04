import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import "./PatientCreation.css";
import { createPatient } from "../../services/patients.services";
import Patient from "../../../../config/models/entities/patient.entity";

type Props = {
  visible: boolean;
  onClose: () => void;
  onPatientCreateSuccess: (patient: Patient) => void;
};

const PatientCreation = ({
  visible,
  onClose,
  onPatientCreateSuccess,
}: Props) => {
  const initialValues: any = {
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "F",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    birthDate: Yup.date().max(new Date()).required(),
    gender: Yup.string().max(1).required(),
  });

  const handleOnSubmit = (values: any) => {
    createPatient(values).then((data) => {
      onPatientCreateSuccess(data);
    });
  };

  if (!visible) return null;

  return (
    <>
      {visible && (
        <div className="modal" style={{ display: "flex" }}>
          <div className="modal-background"></div>
          <div className="modal-card patient_creation">
            <header className="modal-card-head">
              <p className="modal-card-title" style={{ textAlign: "left" }}>
                Creación de paciente
              </p>
              <button
                className="delete"
                aria-label="close"
                onClick={onClose}
              ></button>
            </header>
            <section className="modal-card-body">
              <Formik
                initialValues={initialValues}
                onSubmit={handleOnSubmit}
                validationSchema={validationSchema}
              >
                <Form>
                  <div className="field">
                    <label className="label">Nombre</label>
                    <div className="control">
                      <Field
                        id="firstName"
                        name="firstName"
                        className="input"
                        type="text"
                        placeholder="Nombre del paciente"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Apellido</label>
                    <div className="control">
                      <Field
                        id="lastName"
                        name="lastName"
                        className="input"
                        type="text"
                        placeholder="Apellido del paciente"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Fecha de nacimiento</label>
                    <div className="control">
                      <Field
                        id="birthDate"
                        name="birthDate"
                        className="input"
                        type="date"
                        placeholder="Text input"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Género</label>
                    <div className="control">
                      <div className="select">
                        <Field as="select" id="gender" name="gender">
                          <option value="M">Hombre</option>
                          <option value="F">Mujer</option>
                        </Field>
                      </div>
                    </div>
                  </div>

                  <div
                    className="field is-grouped"
                    style={{ marginTop: "50px" }}
                  >
                    <div className="control">
                      <button className="button is-link" type="submit">
                        Crear Paciente
                      </button>
                    </div>
                    <div className="control">
                      <button
                        type="button"
                        className="button is-link is-light"
                        onClick={onClose}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </Form>
              </Formik>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default PatientCreation;
