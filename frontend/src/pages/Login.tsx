import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { LoginCredentials } from "client/types";
import useAuth from "hooks/useAuth";
import { FormEvent } from "react";

// TODO Improve validation error message display!!!
export const Login: React.FC = (): JSX.Element => {
  const { login, loading, error } = useAuth();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const credentials: LoginCredentials = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    login(credentials);
  };

  return (
    <Flex width="full" align="center" justifyContent="center" pb="250px">
      <Box p={2} w="40%">
        <Box textAlign="center">
          <Heading size="md">Log In</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleSubmit}>
            <FormControl isRequired isInvalid={error !== null}>
              <FormLabel>Email</FormLabel>
              <Input name="email" type="email" placeholder="jane.doe@ucd.ie" size="md" />
            </FormControl>

            <FormControl isRequired marginTop={6} isInvalid={error !== null}>
              <FormLabel>Password</FormLabel>
              <Input name="password" type="password" placeholder="*******" size="md" />
              {error && <FormErrorMessage>Incorrect email or password.</FormErrorMessage>}
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
