import { Text } from "@chakra-ui/react";
import { delay } from "client/util";
import * as vaccination from "client/vaccination";
import useAuth from "hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Response } from "redaxios";

export const Cancellation: React.FC = (): JSX.Element => {
  const { jwtToken } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<Response<any> | undefined>(undefined);

  useEffect(() => {
    vaccination
      .cancel(jwtToken)
      .then(() => delay(1000))
      .then(() => navigate("/home"))
      .catch((e) => setError(e.data.messages));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return error ? (
    <Text align="center" color="red">
      {error}
    </Text>
  ) : (
    <Text color="green">Appointment cancelled. Returning home...</Text>
  );
};
