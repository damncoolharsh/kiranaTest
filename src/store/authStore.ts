import {create} from 'zustand';
import {AuthActions, AuthState} from '../types/storeTypes';

export const useAuthStore = create<AuthState & AuthActions>((set, get) => {
  return {
    userData: null,
    setAuthState: value => set(value),
  };
});
