export interface GenericApiError {
  error: {
    data: {
      error: string;
      message: string;
      statusCode: number;
    };
    status: number;
  };
}
