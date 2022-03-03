import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { Gender, User } from "client/types";
import useAuth from "hooks/useAuth";
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

// TODO Improve validation error message display!!!
export const Registration: React.FC = (): JSX.Element => {
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();

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
      gender: formData.get("gender") as unknown as Gender,
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
            <FormControl isRequired isInvalid={error !== null}>
              <FormLabel>First Name</FormLabel>
              <Input name="firstName" placeholder="Jane" size="md" />
            </FormControl>

            <FormControl isRequired marginTop={6} isInvalid={error !== null}>
              <FormLabel>Last Name</FormLabel>
              <Input name="lastName" placeholder="Doe" size="md" />
            </FormControl>

            <FormControl isRequired marginTop={6} isInvalid={error !== null}>
              <FormLabel>Date of Birth</FormLabel>
              <Input name="dateOfBirth" type="date" max={getMaxDateOfBirth()} size="md" />
            </FormControl>

            <FormControl isRequired marginTop={6} isInvalid={error !== null}>
              <FormLabel>PPS Number</FormLabel>
              <Input name="ppsn" placeholder="1234567AB" size="md" />
            </FormControl>

            <FormControl isRequired marginTop={6} isInvalid={error !== null}>
              <FormLabel>Address</FormLabel>
              <Input name="address" placeholder="UCD, Dublin 4, Co. Dublin, Ireland" size="md" />
            </FormControl>

            <FormControl isRequired marginTop={6} isInvalid={error !== null}>
              <FormLabel>Phone Number</FormLabel>
              <Input name="phoneNo" type="tel" size="md" />
            </FormControl>

            <FormControl isRequired marginTop={6} isInvalid={error !== null}>
              <FormLabel>Nationality</FormLabel>
              <Input name="nationality" placeholder="Ireland" size="md" />
            </FormControl>

            <FormControl isRequired marginTop={6}>
              <FormLabel>Gender</FormLabel>
              <Select name="gender" size="md">
                <option value="FEMALE">Female</option>
                <option value="MALE">Male</option>
                <option value="OTHER">Other</option>
              </Select>
            </FormControl>

            <FormControl isRequired marginTop={6} isInvalid={error !== null}>
              <FormLabel>Email</FormLabel>
              <Input name="email" type="email" placeholder="jane.doe@ucd.ie" size="md" />
            </FormControl>

            <FormControl isRequired marginTop={6} isInvalid={error !== null}>
              <FormLabel>Password</FormLabel>
              <Input name="password" type="password" placeholder="*******" size="md" />
              {error && <FormErrorMessage>Please provide valid input!</FormErrorMessage>}
            </FormControl>

            <Button colorScheme="teal" type="submit" width="full" mt={4} disabled={loading}>
              Submit
            </Button>

            <Text align="center" mt={20}>
              Existing user?
            </Text>
            <Button variant="outline" width="full" mt={2} disabled={loading} onClick={() => navigate("/login")}>
              Log In
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
