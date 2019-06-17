export interface Change {
  coin: string;
  quantity: number;
}

export interface ChangeRequest {
  euro: number;
}

export interface ResponseError {
  error: string;
}
