export type AuthState = {
  userData: UserData | null;
};

export type UserData = {
  name: string;
  stores: string[];
  email: string;
  username: string;
  error?: string;
};

export type AuthActions = {
  setAuthState: (value: Partial<AuthState>) => void;
};
