import { Heading, Table, TableCaption, Tbody, Td, Tr, VStack } from "@chakra-ui/react";
import useAuth from "hooks/useAuth";

const formatKey: { [k: string]: any } = {
  firstName: "First Name",
  lastName: "Last Name",
  dateOfBirth: "Date of Birth",
  ppsn: "PPS No.",
  address: "Address",
  email: "Email",
  phoneNo: "Phone No.",
  nationality: "Nationality",
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
                <Td>{formatKey[k]}</Td>
                <Td>{k.includes("date") ? new Date(v).toUTCString().split("00:")[0] : v}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </VStack>
  );
};
