import Patient from "../entities/patient.entity";

export default interface GetPatientsResponse {
  hasNext: boolean;
  hasPrevious: boolean;
  data: Array<Patient>;
}
