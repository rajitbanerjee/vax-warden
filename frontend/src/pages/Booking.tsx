import { Text } from "@chakra-ui/react";
import useAuth from "hooks/useAuth";

export const Booking: React.FC = (): JSX.Element => {
  const { currentUser, jwtToken } = useAuth();
  return <Text>Hello, Booking!</Text>;
};
