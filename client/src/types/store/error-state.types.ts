export interface Error {
  errorId: string,
  errorMessage: string
}

export interface ErrorState {
  errors: Error[];
}
