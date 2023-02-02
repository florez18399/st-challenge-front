import Gender from "./gender.enum";

export default interface Patient {
  patientId: number;
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: Gender;
}
