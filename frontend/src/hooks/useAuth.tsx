import * as auth from "client/auth";
import { LoginCredentials, User, UserRole } from "client/types";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Response } from "redaxios";

export interface AuthContextType {
  currentUser: User;
  jwtToken: string;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  error?: Response<any>;
  register: (user: User) => void;
  login: (loginCredentials: LoginCredentials) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC = ({ children }): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<User | undefined>(getSessionStorage("currentUser", undefined));
  const [jwtToken, setJwtToken] = useState<string | undefined>(getSessionStorage("jwtToken", undefined));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(getSessionStorage("isAuthenticated", false));
  const [isAdmin, setIsAdmin] = useState<boolean>(getSessionStorage("isAdmin", false));

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Response<any> | null>();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setSessionStorage("currentUser", currentUser);
    setSessionStorage("jwtToken", jwtToken);
    setSessionStorage("isAuthenticated", isAuthenticated);
    setSessionStorage("isAdmin", isAdmin);
    setError(null);
  }, [currentUser, jwtToken, isAuthenticated, isAdmin, location.pathname]);

  function setSessionStorage(key: string, value: any) {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      // https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
    }
  }

  function getSessionStorage(key: string, initialValue: any) {
    try {
      const value = window.sessionStorage.getItem(key);
      return value !== null ? JSON.parse(value) : initialValue;
    } catch (e) {
      return initialValue;
    }
  }

  const register = (user: User) => {
    setLoading(true);
    auth
      .register(user)
      .then((newUser) => {
        setCurrentUser(newUser);
        setJwtToken(newUser.jwtToken);
        setIsAuthenticated(true);
        setIsAdmin(newUser.userRole === UserRole.ROLE_ADMIN);
        navigate("/home");
      })
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  };

  const login = (loginCredentials: LoginCredentials) => {
    setLoading(true);
    auth
      .login(loginCredentials)
      .then((newUser) => {
        setCurrentUser(newUser);
        setJwtToken(newUser.jwtToken);
        setIsAuthenticated(true);
        setIsAdmin(newUser.userRole === UserRole.ROLE_ADMIN);
        navigate("/home");
      })
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  };

  const logout = () => {
    setCurrentUser(undefined);
    setJwtToken(undefined);
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  // Make the provider update only when it should
  const memoedValue = useMemo(
    () => ({
      currentUser,
      jwtToken,
      isAuthenticated,
      isAdmin,
      loading,
      error,
      register,
      login,
      logout,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser, loading, error]
  );

  return <AuthContext.Provider value={memoedValue as AuthContextType}>{children}</AuthContext.Provider>;
};

export default function useAuth(): AuthContextType {
  return useContext(AuthContext);
}
