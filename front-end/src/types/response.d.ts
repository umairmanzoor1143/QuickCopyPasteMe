type ApiResponse<T> = {
  data: T;
  cursor?: { [key: string]: string } | string;
  [key: string]: unknown;
};
