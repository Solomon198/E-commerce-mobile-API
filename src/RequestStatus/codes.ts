import STATUS_TYPES from "../Types/status";

const STATUS_CODES: STATUS_TYPES = {
  OK: {
    CODE: 200,
    STATUS_TEXT: "SUCCESSFULL",
    DESCRIPTION: "Request successfully excecuted!!",
  },
  CREATED: {
    CODE: 201,
    STATUS_TEXT: "RESOURCE CREATED",
    DESCRIPTION: "Resource created succeffully!!",
  },
  BAD_REQUEST: {
    CODE: 400,
    STATUS_TEXT: "BAD REQUEST",
    DESCRIPTION:
      "Bad input parameter, undefined parameter sent please check all required inputs !!",
  },
  UNAUTHORIZED: {
    CODE: 401,
    STATUS_TEXT: "UNAUTHORIZED",
    DESCRIPTION:
      "client passed in the invalid Auth token. Client should refresh the token and then try again.",
  },
  FORBIDDEN: {
    CODE: 403,
    STATUS_TEXT: "FORBIDDEN",
    DESCRIPTION:
      "* Customer doesn’t exist. * Application not registered. * Application try to access to properties not belong to an App. * Application try to trash/purge root node. * Application try to update contentProperties. * Operation is blocked (for third-party apps). * Customer account over quota.",
  },

  NOT_FOUND: {
    CODE: 404,
    STATUS_TEXT: "NOT FOUND",
    DESCRIPTION: "Resource not found !!!.",
  },

  METHOD_NOT_ALLOWED: {
    CODE: 405,
    STATUS_TEXT: "METHOD NOT ALLOWED",
    DESCRIPTION:
      "The resource doesn't support the specified HTTP verb !!!.",
  },

  CONFLICT: {
    CODE: 409,
    STATUS_TEXT: "CONFLICT",
    DESCRIPTION: "Request conflicts !!!.",
  },

  LENGTH_REQUIRED: {
    CODE: 411,
    STATUS_TEXT: "LENGTH REQUIRED",
    DESCRIPTION: "The Content-Length header was not specified !!!.",
  },

  PRECONDITION_FAILED: {
    CODE: 412,
    STATUS_TEXT: "PRECONDITION FAILED",
    DESCRIPTION: "Precondition failed !!!.",
  },

  TOO_MANY_REQURES: {
    CODE: 429,
    STATUS_TEXT: "TOO MANY REQUESTS",
    DESCRIPTION: "Too Many Requests",
  },

  INTERNAL_SERVER_ERROR: {
    CODE: 500,
    STATUS_TEXT: "INTERNAL SERVER ERROR",
    DESCRIPTION:
      "Servers are not working as expected. The request is probably valid but needs to be requested again later !! .",
  },

  SERVICE_UNAVAILABLE: {
    CODE: 503,
    STATUS_TEXT: "SERVICE UNAVAILABLE",
    DESCRIPTION: "Service unavailable !!! .",
  },

  INVALID_ACCOUNT: {
    CODE: 409,
    STATUS_TEXT: "REGISTRATION NOT COMPLETED",
    DESCRIPTION: "ACCOUNT NOT VERIFIED.",
  },
};

export default STATUS_CODES;
