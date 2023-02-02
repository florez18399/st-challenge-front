import Gender from "./gender.enum";

export default interface Medicine {
  medicineId: number;
  name: string;
  minAgeConsumption: number;
  maxAgeConsumption: number;
  genderConsumption: Gender;
}
