type ApiResponse<T> = {
  data: T;
  cursor?: { [key: string]: string } | string;
  [key: string]: unknown;
};
type RoomType = {
  confirmed: boolean;
  room: string;
};
