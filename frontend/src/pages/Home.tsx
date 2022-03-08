import { Heading, Text, VStack } from "@chakra-ui/react";
import * as statistics from "client/statistics";
import { Statistics } from "client/types";
import { formatDate } from "client/util";
import useAuth from "hooks/useAuth";
import { useEffect, useState } from "react";
import type { Response } from "redaxios";

export const Home: React.FC = (): JSX.Element => {
  const { currentUser, jwtToken } = useAuth();
  const [stats, setStats] = useState<Statistics | undefined>(undefined);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Response<any> | null>();

  const fetchData = (token: string) => {
    setLoading(true);
    statistics
      .getForUser(token)
      .then((newStats) => setStats(newStats))
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData(jwtToken);
  }, [jwtToken]);

  return (
    <VStack spacing={5} pb="200px">
      <Heading size="md" textAlign="center">
        {currentUser.firstName} {currentUser.lastName}
      </Heading>
      <Text>Date of Birth: {formatDate(currentUser.dateOfBirth)}</Text>
      <Text>{JSON.stringify(stats, null, 2)}</Text>
    </VStack>
  );
};
