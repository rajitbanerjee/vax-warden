import { Heading, Table, TableCaption, Tbody, Td, Tr, VStack } from "@chakra-ui/react";
import { UserDetailsKeys } from "client/types";
import { formatDate } from "client/util";
import useAuth from "hooks/useAuth";

export const formatUserDetailsKey: UserDetailsKeys = {
  firstName: "First Name",
  lastName: "Last Name",
  dateOfBirth: "Date of Birth",
  ppsn: "PPS No.",
  address: "Address",
  email: "Email",
  phoneNo: "Phone No.",
  nationality: "Nationality",
  gender: "Gender",
  password: "Password", // Not used in MyAccount, but instead in Login
  ageGroup: "Age Group",
};

const formatUserDetailsValue = (k: string, v: any): string => {
  if (k.includes("date")) return formatDate(v);
  if (k === "gender") return v[0].toUpperCase() + v.substring(1).toLowerCase();
  return v;
};

const keysToHide = ["id", "jwtToken", "userRole"];

export const MyAccount: React.FC = (): JSX.Element => {
  const { currentUser } = useAuth();

  return (
    <VStack spacing={5} pb="200px">
      <Heading size="md" textAlign="center">
        Details
      </Heading>
      <Table variant="simple">
        <TableCaption>Please call the COVID-19 helpline on 1800 700 700 to change your account details.</TableCaption>
        <Tbody>
          {Object.entries(currentUser)
            .filter(([k, _]) => !keysToHide.includes(k))
            .map(([k, v]) => (
              <Tr>
                <Td>{formatUserDetailsKey[k as keyof UserDetailsKeys]}</Td>
                <Td>{formatUserDetailsValue(k, v)}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </VStack>
  );
};
