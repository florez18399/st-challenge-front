import React, { useEffect, useState } from "react";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import "./PrescriptionCreation.css";
import Medicine from "../../../../config/models/entities/medicine.entity";
import { getMedicinesList } from "../../../../config/services/general.services";
import Prescription from "../../../../config/models/entities/prescription.entity";
import { createPresciption } from "../../services/patients.services";

type Props = {
  visible: boolean;
  patientId: number;
  onClose: () => void;
  onPrescriptionSucces: (prescription: Prescription) => void;
};

const PrescriptionCreation = ({
  visible,
  onClose,
  patientId,
  onPrescriptionSucces,
}: Props) => {
  const [medicinesList, setMedicinesList] = useState<Array<Medicine>>([]);

  const initialValues = {
    medicineId: 0,
  };

  const validationSchema = Yup.object().shape({
    medicineId: Yup.number().positive().required(),
  });

  useEffect(() => {
    let ignore = false;
    const abortController = new AbortController();

    getMedicinesList().then((info) => {
      if (info && !ignore) {
        setMedicinesList(info);
      }
    });

    return function cleanup() {
      ignore = true;
      abortController.abort();
    };
  }, []);

  const handleOnSubmit = (values: any) => {
    createPresciption(patientId, values.medicineId)
      .then((data) => {
        onPrescriptionSucces(data);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  if (!visible) return null;

  return (
    <div className="prescription-creation">
      <Formik
        initialValues={initialValues}
        onSubmit={handleOnSubmit}
        validationSchema={validationSchema}
      >
        <Form className="prescription-creation__form">
          <div className="field">
            <label className="label">Selecciona medicina</label>
            <div className="control">
              <div className="select">
                <Field as="select" id="medicineId" name="medicineId">
                  <option value={0}>Selecciona medicina</option>
                  {medicinesList &&
                    medicinesList.map((medicine) => (
                      <option
                        key={`prescription-form-medicine-opt-${medicine.medicineId}`}
                        value={medicine.medicineId}
                      >
                        {medicine.name}
                      </option>
                    ))}
                </Field>
              </div>
            </div>
          </div>
          <div className="prescription-creation__form-controls field">
            <div className="control">
              <button className="button is-success" type="submit">
                Prescribir
              </button>
            </div>
            <div className="control">
              <button
                type="button"
                className="button is-link"
                onClick={onClose}
              >
                Cancelar
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default PrescriptionCreation;
