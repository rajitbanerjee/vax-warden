import { Text } from "@chakra-ui/react";
import useAuth from "hooks/useAuth";
import { useEffect } from "react";

export const Logout: React.FC = (): JSX.Element => {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);

  return <Text>Successfully logged out.</Text>;
};
