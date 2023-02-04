const HOST_URL = "http://localhost/st";

export function requestFailed(response: Response): boolean {
  return (
    response.status === 500 ||
    response.status === 400 ||
    response.status === 404
  );
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

export async function postData<T>(
  url: string,
  body: any,
  abortController?: AbortController
): Promise<T> {
  const response = await fetch(`${HOST_URL}${url}`, {
    method: "POST",
    signal: abortController?.signal,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (requestFailed(response)) {
    return Promise.reject(data);
  }

  return data;
}

export async function deleteData<T>(
  url: string,
  abortController?: AbortController
): Promise<T> {
  const response = await fetch(`${HOST_URL}${url}`, {
    method: "DELETE",
    signal: abortController?.signal,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (requestFailed(response)) {
    return Promise.reject(data);
  }

  return data;
}
