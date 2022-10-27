interface ReceivedError {
  code: number,
  message: string
}

const clientError = {
  400: "bad_request",
  401: "unauthorized",
  404: "not_found",
  409: "conflict",
  422: "unprocessable_entity",
};

export function errorFactory({ code, message }: ReceivedError) {
  return { code, type: clientError[code], message };
}