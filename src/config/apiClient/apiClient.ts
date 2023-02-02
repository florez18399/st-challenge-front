const HOST_URL = "http://localhost/st";

export function requestFailed(response: Response): boolean {
  return response.status === 500 || response.status === 400;
}

export async function getData<T>(
  url: string,
  abortController?: AbortController
): Promise<T> {
  const response = await fetch(`${HOST_URL}${url}`, {
    signal: abortController?.signal,
  });

  const data = await response.json();

  if (requestFailed(response)) {
    return Promise.reject(data);
  }

  return data;
}
