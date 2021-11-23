type STATUS_TYPES = {
  OK: {
    CODE: number;
    STATUS_TEXT: string;
    DESCRIPTION: string;
  };
  CREATED: {
    CODE: number;
    STATUS_TEXT: string;
    DESCRIPTION: string;
  };
  BAD_REQUEST: {
    CODE: number;
    STATUS_TEXT: string;
    DESCRIPTION: string;
  };
  UNAUTHORIZED: {
    CODE: number;
    STATUS_TEXT: string;
    DESCRIPTION: string;
  };
  FORBIDDEN: {
    CODE: number;
    STATUS_TEXT: string;
    DESCRIPTION: string;
  };

  NOT_FOUND: {
    CODE: number;
    STATUS_TEXT: string;
    DESCRIPTION: string;
  };

  METHOD_NOT_ALLOWED: {
    CODE: number;
    STATUS_TEXT: string;
    DESCRIPTION: string;
  };

  CONFLICT: {
    CODE: number;
    STATUS_TEXT: string;
    DESCRIPTION: string;
  };

  LENGTH_REQUIRED: {
    CODE: number;
    STATUS_TEXT: string;
    DESCRIPTION: string;
  };

  PRECONDITION_FAILED: {
    CODE: number;
    STATUS_TEXT: string;
    DESCRIPTION: string;
  };

  TOO_MANY_REQURES: {
    CODE: number;
    STATUS_TEXT: string;
    DESCRIPTION: string;
  };

  INTERNAL_SERVER_ERROR: {
    CODE: number;
    STATUS_TEXT: string;
    DESCRIPTION: string;
  };

  SERVICE_UNAVAILABLE: {
    CODE: number;
    STATUS_TEXT: string;
    DESCRIPTION: string;
  };

  INVALID_ACCOUNT: {
    CODE: number;
    STATUS_TEXT: string;
    DESCRIPTION: string;
  };
};

export default STATUS_TYPES;
