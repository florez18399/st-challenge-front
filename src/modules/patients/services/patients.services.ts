import { getData } from "../../../config/apiClient/apiClient";
import GetPatientsResponse from "../../../config/models/dtos/getPatientsResponse.dto";
import Gender from "../../../config/models/entities/gender.enum";

export async function getPatients(
  abortController?: AbortController,
  name?: string,
  gender?: Gender
) {
  let url: string = `/patients`;
  return getData<GetPatientsResponse>(url, abortController);
}
