export type AuthState = {
  userData: UserData | null;
};

export type UserData = {
  name: string;
  stores: string[];
};

export type AuthActions = {
  setAuthState: (value: Partial<AuthState>) => void;
};
