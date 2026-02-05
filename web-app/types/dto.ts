export type ApiDataResponse<T = never> = {
  success: true;
  data: T;
};

export type ApiListResponse<T = never, M = object> = {
  success: true;
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
  } & M;
};

export type ApiErrorResponse = {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};
