export {};

export enum AuthState {
  Signed = "Signed",
  SignedOut = "SignedOut",
  Signing = "Signing",
}

export type User = {
  id: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Pet = {
  id: string;
  userId: string;
  name: string;
  type: string;
  gene: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Response<T = unknown> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    status: unknown;
  };
};
