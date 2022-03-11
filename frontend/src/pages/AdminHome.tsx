import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import * as admin from "client/admin";
import { User, VaccinationUpdate, VaccineType } from "client/types";
import useAuth from "hooks/useAuth";
import useWindowDimensions from "hooks/useWindowDimensions";
import { useEffect, useState } from "react";

export const AdminHome: React.FC = (): JSX.Element => {
  const { jwtToken, currentUser } = useAuth();
  const [users, setUsers] = useState<User[] | undefined>(undefined);
  const { width } = useWindowDimensions();

  const makeVaccinationUpdate = (vaccineType: VaccineType): VaccinationUpdate => {
    if (!currentUser.vaccination) return {};
    switch (currentUser.vaccination.dosesReceived) {
      case 0:
        return {
          firstVaccineType: vaccineType,
        };
      case 1:
        return {
          secondVaccineType: vaccineType,
        };
      default:
        return {};
    }
  };

  const updateVaccination = (userId: number, vaccineType: VaccineType, token: string) => {
    const vaccinationUpdate = makeVaccinationUpdate(vaccineType);
    admin
      .updateVaccination(userId, vaccinationUpdate, token)
      .then(() => {
        // TODO update list of users (easy) or just single user in table (need to think)
      })
      .catch((e) => console.log(e));
  };

  const fetchData = (token: string) => {
    admin.listUsers(token).then((users) => {
      setUsers(users);
    });
  };

  useEffect(() => {
    fetchData(jwtToken);
  }, [jwtToken]);

  // TODO change VStack to table, with a single button (in a column maybe) to update vaccination. makeVaccinationUpdate() will determine which dose it is.
  // TODO vaccineType should be a Select (in another column) with set VaccineType options, so no chance of invalid input (see Registration form for Gender)
  // TODO Essentially the entire vaccination update process may be a single table of users, with Buttons/Select in cells
  const listUsers = (): JSX.Element | JSX.Element[] => {
    if (!users) return <Text>No users registered for vaccination!</Text>;
    return users.map((user) => {
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
    });
  };

  return (
    <VStack spacing={10} pb="200px">
      <Heading size="md" textAlign="center">
        Users
      </Heading>
      {listUsers()})
    </VStack>
  );
};
