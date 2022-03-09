import { Text } from "@chakra-ui/react";
import * as vaccination from "client/vaccination";
import useAuth from "hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const Cancellation: React.FC = (): JSX.Element => {
  const { jwtToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    vaccination
      .cancel(jwtToken)
      .then(() => delay(3000))
      .then(() => navigate("/home"))
      .catch((e) => console.log(e.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Text>Appointment cancelled. Returning home...</Text>;
};
