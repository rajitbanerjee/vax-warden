import {
  Button,
  FormControl,
  Heading,
  Select,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import * as admin from "client/admin";
import { User, Vaccination, VaccinationUpdate, VaccineType } from "client/types";
import useAuth from "hooks/useAuth";
import { useEffect, useState, MouseEvent, ChangeEvent } from "react";

export const AdminHome: React.FC = (): JSX.Element => {
  const { jwtToken } = useAuth();
  const [users, setUsers] = useState<User[] | undefined>(undefined);
  const [vaccineTypes, setVaccineTypes] = useState<{ [key: number]: VaccineType }>();

  const makeVaccinationUpdate = (vaccineType: VaccineType, dosesReceived: number): VaccinationUpdate => {
    switch (dosesReceived) {
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

  const handleSubmit = async (
    _event: MouseEvent<HTMLButtonElement>,
    userId: number | undefined,
    dosesReceived: number
  ) => {
    if (userId && vaccineTypes) {
      const vaccinationUpdate = makeVaccinationUpdate(vaccineTypes[userId], dosesReceived);
      await admin.updateVaccination(userId, vaccinationUpdate, jwtToken);
      fetchData(jwtToken);
    }
  };

  const vaccineTypeHandler = (event: ChangeEvent<HTMLSelectElement>, userId: number | undefined) => {
    if (userId) {
      const vaccineType = event.target.value;
      setVaccineTypes({
        ...vaccineTypes,
        [userId]: vaccineType as VaccineType,
      });
    }
  };

  const fetchData = (token: string) => {
    admin.listUsers(token).then((users) => {
      setUsers(users);
      setVaccineTypes({});
    });
  };

  useEffect(() => {
    fetchData(jwtToken);
  }, [jwtToken]);

  const getStatus = (vax: Vaccination | undefined): string => {
    if (vax === null) {
      return "No Appointments";
    }
    switch (vax?.dosesReceived) {
      case 0:
        return "Awaiting First Dose";
      case 1:
        return "Awaiting Second Dose";
      default:
        return "Fully Vaccinated";
    }
  };

  const listUsers = (): JSX.Element | JSX.Element[] => {
    if (!users)
      return (
        <Tr>
          <Td colSpan={6}>
            <Text>No users registered for vaccination!</Text>
          </Td>
        </Tr>
      );
    return users.map((user) => {
      let vax = user.vaccination;
      const displaySelector = vax && vax.dosesReceived !== 2;
      return (
        <Tr key={user.email}>
          <Td>{user.email}</Td>
          <Td>{`${user.firstName} ${user.lastName}`}</Td>
          <Td>{vax?.dosesReceived ?? 0}</Td>
          <Td>{getStatus(vax)}</Td>
          <Td>
            {displaySelector && (
              <FormControl>
                <Select
                  placeholder="Vaccine Type"
                  name={`select-${user.id}`}
                  onChange={(event) => vaccineTypeHandler(event, user.id)}
                >
                  {(Object.keys(VaccineType) as Array<keyof typeof VaccineType>).map((key) => (
                    <option value={key} key={key}>
                      {key}
                    </option>
                  ))}
                </Select>
              </FormControl>
            )}
          </Td>
          <Td>
            {displaySelector && (
              <Button
                colorScheme="teal"
                type="submit"
                onClick={(event) => handleSubmit(event, user.id, vax?.dosesReceived ?? 0)}
              >
                Submit
              </Button>
            )}
          </Td>
        </Tr>
      );
    });
  };

  return (
    <VStack spacing={10} pb="200px">
      <Table variant="simple" size={"md"}>
        <TableCaption placement="top">
          <Heading size="md" textAlign="center">
            Users
          </Heading>
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Email</Th>
            <Th>Name</Th>
            <Th isNumeric>Doses Received</Th>
            <Th>Status</Th>
            <Th />
            <Th />
          </Tr>
        </Thead>
        <Tbody>{listUsers()}</Tbody>
      </Table>
    </VStack>
  );
};
