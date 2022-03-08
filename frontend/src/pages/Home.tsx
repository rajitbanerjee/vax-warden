import { Heading, VStack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useAuth from "hooks/useAuth";
import * as vaccination from "client/vaccination";
import { Vaccination } from "client/types";

export const Home: React.FC = (): JSX.Element => {
  const { currentUser, jwtToken } = useAuth();
  const [count, setCount] = useState(0);
  const [vax, setVax] = useState<Vaccination | undefined>(undefined);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async (id: number, jwtToken: string) => {
      const response = await vaccination.get(id, jwtToken);
      setVax(response);
    };
    fetchData(currentUser.id!, jwtToken).catch(console.error);
    setCount(1);
  }, [currentUser.id, jwtToken, count]);

  return (
    <VStack spacing={5} pb="200px">
      <Heading size="md" textAlign="center">
        {currentUser.firstName} {currentUser.lastName}
      </Heading>
      <Text>{new Date(currentUser.dateOfBirth).toUTCString().split("00:")[0]}</Text>{" "}
      {/** TODO remove, used for getting token to make vaccine booking**/}
      <Text>{currentUser.jwtToken}</Text>
      <Text>{vax!.centre}</Text>
    </VStack>
  );
};
