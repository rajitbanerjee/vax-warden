import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { LoginCredentials } from "client/types";
import useAuth from "hooks/useAuth";
import { formatUserDetailsKey } from "pages/MyAccount";
import { FormEvent, useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import type { Response } from "redaxios";

export const Login: React.FC = (): JSX.Element => {
  const { login, loading, error } = useAuth();
  const [bruteForceError, setBruteForceError] = useState<string | undefined>(undefined);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [verified, setVerified] = useState<boolean>(false);

  useEffect(() => {
    checkBruteForceError(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const checkBruteForceError = (error?: Response<any>) => {
    if (!error || !error.data) return;
    const errorMessages: string[] = error.data.messages;
    errorMessages.forEach((e) => {
      if (e.includes("BruteForce")) {
        setBruteForceError(e.split(":")[1]);
      }
    });
  };

  const handlePasswordShow = () => {
    setShowPassword(!showPassword);
  };

  const handleVerification = () => {
    setVerified(true);
  };

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
              <FormLabel>{formatUserDetailsKey.email}</FormLabel>
              <Input name="email" type="email" placeholder="jane.doe@ucd.ie" size="md" />
            </FormControl>

            <FormControl isRequired marginTop={6} isInvalid={error !== null}>
              <FormLabel>{formatUserDetailsKey.password}</FormLabel>
              <InputGroup>
                <Input name="password" type={showPassword ? "text" : "password"} placeholder="*******" size="md" />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handlePasswordShow} variant="ghost">
                    {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {error && !bruteForceError && <FormErrorMessage>Incorrect email or password.</FormErrorMessage>}
              {bruteForceError && <FormErrorMessage>{bruteForceError}</FormErrorMessage>}
            </FormControl>

            <Button
              colorScheme="teal"
              type="submit"
              width="full"
              mt={4}
              disabled={loading || !verified || !!bruteForceError}
            >
              Submit
            </Button>
            <Center pt="50px">
              <ReCAPTCHA sitekey="6LdSRdAfAAAAAE5Qbv-Qg6vmiATbXK8SPJFDu9Ai" onChange={handleVerification} />
            </Center>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};
