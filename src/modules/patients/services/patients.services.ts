import {
  deleteData,
  getData,
  postData,
} from "../../../config/apiClient/apiClient";
import GetPatientsResponse from "../../../config/models/dtos/getPatientsResponse.dto";
import Patient from "../../../config/models/entities/patient.entity";
import Prescription from "../../../config/models/entities/prescription.entity";

export async function getPatients(
  params: any,
  abortController?: AbortController
) {
  let url: string = `/patients?`;
  const paramsUrl = new URLSearchParams(params);
  url = typeof params === "object" ? url + paramsUrl : url;
  return getData<GetPatientsResponse>(url.toString(), abortController);
}

export async function createPatient(
  body: any,
  abortController?: AbortController
): Promise<Patient> {
  let url: string = `/patients`;

  return postData<Patient>(url, body, abortController);
}

export async function deletePatient(
  patientId: number,
  abortController?: AbortController
): Promise<boolean> {
  let url: string = `/patients/${patientId}`;
  
  return deleteData<boolean>(url, abortController);
}

export async function getPatientPrescriptions(
  patientId: number,
  abortController?: AbortController
): Promise<Array<Prescription>> {
  let url: string = `/prescriptions/${patientId}`;

  return getData<Array<Prescription>>(url.toString(), abortController);
}

export async function createPresciption(
  patientId: number,
  medicineId: number,
  abortController?: AbortController
): Promise<Prescription> {
  let url: string = `/prescriptions?patientId=${patientId}&medicineId=${medicineId}`;

  return postData<Prescription>(url.toString(), abortController);
}
