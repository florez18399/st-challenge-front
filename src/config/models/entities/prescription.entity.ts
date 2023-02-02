import Medicine from "./medicine.entity";
import Patient from "./patient.entity";

export default interface Prescription {
  prescriptionId: number;
  patient: Patient;
  medicine: Medicine;
  prescriptionDate: Date;
}
