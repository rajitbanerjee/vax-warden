import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Text } from "@chakra-ui/react";
import { User } from "client/types";
import colors from "custom/colors";
import useAuth from "hooks/useAuth";
import { FormEvent } from "react";

// TODO Improve validation error message display!!!
export const Registration: React.FC = (): JSX.Element => {
  const { register, loading, error } = useAuth();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const user: User = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      dateOfBirth: formData.get("dateOfBirth") as unknown as Date,
      ppsn: formData.get("ppsn") as string,
      address: formData.get("address") as string,
      email: formData.get("email") as string,
      phoneNo: formData.get("phoneNo") as string,
      nationality: formData.get("nationality") as string,
      password: formData.get("password") as string,
    };
    register(user);
  };

  return (
    <Flex width="full" align="center" justifyContent="center" pb="250px">
      <Box p={2} w="40%">
        <Box textAlign="center">
          <Heading size="md">Registration</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel>First Name</FormLabel>
              <Input name="firstName" placeholder="Jane" size="md" />
              {error && <Text color={colors.error}>{JSON.stringify(error.data)}</Text>}
            </FormControl>

            <FormControl isRequired marginTop={6}>
              <FormLabel>Last Name</FormLabel>
              <Input name="lastName" placeholder="Doe" size="md" />
            </FormControl>

            <FormControl isRequired marginTop={6}>
              <FormLabel>Date of Birth</FormLabel>
              <Input name="dateOfBirth" type="date" max={getMaxDateOfBirth()} size="md" />
            </FormControl>

            <FormControl isRequired marginTop={6}>
              <FormLabel>PPS Number</FormLabel>
              <Input name="ppsn" placeholder="1234567AB" size="md" />
            </FormControl>

            <FormControl isRequired marginTop={6}>
              <FormLabel>Address</FormLabel>
              <Input name="address" placeholder="UCD, Dublin 4, Co. Dublin, Ireland" size="md" />
            </FormControl>

            <FormControl isRequired marginTop={6}>
              <FormLabel>Phone Number</FormLabel>
              <Input name="phoneNo" type="tel" size="md" />
            </FormControl>

            <FormControl isRequired marginTop={6}>
              <FormLabel>Nationality</FormLabel>
              <Input name="nationality" placeholder="Ireland" size="md" />
            </FormControl>

            <FormControl isRequired marginTop={6}>
              <FormLabel>Email</FormLabel>
              <Input name="email" type="email" placeholder="jane.doe@ucd.ie" size="md" />
            </FormControl>

            <FormControl isRequired marginTop={6}>
              <FormLabel>Password</FormLabel>
              <Input name="password" type="password" placeholder="*******" size="md" />
            </FormControl>

            <Button colorScheme="teal" type="submit" width="full" mt={4} disabled={loading}>
              Submit
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

const getMaxDateOfBirth = (): string => {
  const adultDOB = new Date();
  adultDOB.setFullYear(adultDOB.getFullYear() - 18);
  // YYYY-MM-DD
  return adultDOB.toLocaleDateString("en-GB").split("/").reverse().join("-");
};
