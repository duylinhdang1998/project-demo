import { UserInfo } from 'models/UserInfo';
import { persist } from 'utils/persistZustand';
import create from 'zustand';

interface AuthState {
  token: string;
  isLoggedIn: boolean;
  login: (token: string, role: UserInfo['role']) => void;
  logout: () => void;
  userInfo?: UserInfo;
}

const initialState: Pick<AuthState, 'isLoggedIn' | 'token' | 'userInfo'> = {
  token: '',
  isLoggedIn: false,
  userInfo: {},
};

const useAuthStore = create<AuthState>(
  persist(
    {
      key: 'auth',
      allowlist: ['token', 'userInfo'],
    },
    (set) => ({
      ...initialState,
      login: (token: string, role: UserInfo['role']) => {
        return set((state) => ({
          ...state,
          token: token,
          isLoggedIn: true,
          userInfo: {
            role,
          },
        }));
      },
      logout: () => {
        return set((state) => ({ ...state, ...initialState }));
      },
    }),
  ),
);

export default useAuthStore;
