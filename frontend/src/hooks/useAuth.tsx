import * as auth from "client/auth";
import { LoginCredentials, User, UserRole } from "client/types";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Response } from "redaxios";

export interface AuthContextType {
  currentUser: User;
  jwtToken: string;
  loading: boolean;
  error?: Response<any>;
  register: (user: User) => void;
  login: (loginCredentials: LoginCredentials) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC = ({ children }): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<User>();
  const [jwtToken, setJwtToken] = useState<string>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [error, setError] = useState<Response<any> | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) setError(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const register = (user: User) => {
    setLoading(true);
    auth
      .register(user)
      .then((newUser) => {
        setCurrentUser(newUser);
        setJwtToken(newUser.jwtToken);
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
        setIsAdmin(newUser.userRole === UserRole.ROLE_ADMIN);
        navigate("/home");
      })
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  };

  const logout = () => {
    setCurrentUser(undefined);
    setJwtToken(undefined);
    setIsAdmin(false);
    navigate("/login");
  };

  // Make the provider update only when it should
  const memoedValue = useMemo(
    () => ({
      currentUser,
      jwtToken,
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
