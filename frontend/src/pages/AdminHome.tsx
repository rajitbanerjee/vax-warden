import { Box, Divider, Heading, Text, VStack } from "@chakra-ui/react";
import { User } from "client/types";
import useAuth from "hooks/useAuth";
import * as admin from "client/admin";
import { useEffect, useState } from "react";
import useWindowDimensions from "hooks/useWindowDimensions";

const vaccineTypes = ["PFIZER_BIONTECH", "MODERNA"];

export const AdminHome: React.FC = (): JSX.Element => {
  const { jwtToken } = useAuth();
  const [users, setUsers] = useState<User[] | undefined>(undefined);
  const { width } = useWindowDimensions();

  const fetchData = (token: string) => {
    admin.listUsers(token).then((users) => {
      setUsers(users);
    });
  };

  useEffect(() => {
    fetchData(jwtToken);
  }, [jwtToken]);

  return (
    <VStack spacing={10} pb="200px">
      <Heading size="md" textAlign="center">
        Users
      </Heading>
      <Divider />
      {users &&
        users.map((user) => {
          const vax = user.vaccination;
          return (
            <VStack alignItems={"flex-start"} width={width / 3}>
              <Text>Name: {`${user.firstName} ${user.lastName}`}</Text>
              <Text>Email: {user.email}</Text>
              {vax && (
                <Box py={2}>
                  <Text>Doses Received: {vax.dosesReceived}</Text>
                  <Text>First Appointment: {new Date(vax.firstAppointment as string).toLocaleDateString()}</Text>
                  {vax.firstVaccineType && <Text>First Vaccine Type: {vax.firstVaccineType}</Text>}
                  {vax.secondAppointment && (
                    <Text>Second Appointment: {new Date(vax.secondAppointment as string).toLocaleDateString()}</Text>
                  )}
                  {vax.secondVaccineType && <Text>Second Vaccine Type: {vax.secondVaccineType}</Text>}
                </Box>
              )}
            </VStack>
          );
        })}
      )
    </VStack>
  );
};
