import { getData } from "../apiClient/apiClient";
import Medicine from "../models/entities/medicine.entity";

/**
 * Servicio para obtener la lista de medicamentos
 * @param abortController
 * @returns
 */
export async function getMedicinesList(
  abortController?: AbortController
): Promise<Array<Medicine>> {
  let url: string = `/medicines`;

  return getData<Array<Medicine>>(url.toString(), abortController);
}
