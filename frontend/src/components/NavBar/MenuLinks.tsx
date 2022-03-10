import { HStack } from "@chakra-ui/react";
import useAuth from "hooks/useAuth";
import { useLocation } from "react-router-dom";
import { MenuItem } from "./MenuItem";

export const MenuLinks: React.FC = (): JSX.Element => {
  const { isAdmin, isAuthenticated } = useAuth();
  const location = useLocation();
  const isRegistrationPage = location.pathname === "/";
  const isLoginPage = location.pathname === "/login";

  return (
    <HStack spacing={8}>
      {isAuthenticated && <MenuItem to="/home">{isAdmin ? "Admin" : "Home"}</MenuItem>}
      <MenuItem to="/statistics">Statistics</MenuItem>
      {isAuthenticated && <MenuItem to="/forum">Forum</MenuItem>}
      {isAuthenticated && !isAdmin && <MenuItem to="/myaccount">My Account</MenuItem>}
      {!isAuthenticated && !isRegistrationPage && !isAdmin && <MenuItem to="/">Registration</MenuItem>}
      {!isAuthenticated && !isLoginPage && <MenuItem to="/login">Log In</MenuItem>}
      {isAuthenticated && <MenuItem to="/logout">Log Out</MenuItem>}
    </HStack>
  );
};
