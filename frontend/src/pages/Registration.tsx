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
  Select,
  Text,
} from "@chakra-ui/react";
import { Gender, User, UserDetailsKeys } from "client/types";
import useAuth from "hooks/useAuth";
import { formatUserDetailsKey } from "pages/MyAccount";
import { FormEvent, useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import PasswordChecklist from "react-password-checklist";
import { useNavigate } from "react-router-dom";
import type { Response } from "redaxios";

export const Registration: React.FC = (): JSX.Element => {
  const { register, loading, error, logout } = useAuth();
  const [errorMap, setErrorMap] = useState<{ [key: string]: string }>({});
  const [isLoggedOut, setLoggedOut] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [passwordAgain, setPasswordAgain] = useState<string>("");
  const [validPassword, setValidPassword] = useState<boolean>(false);
  const [verified, setVerified] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Log out only once before new registration
    if (!isLoggedOut) {
      logout();
      setLoggedOut(true);
    }
    setErrorMap(mapUserDetailsErrors(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const handlePasswordShow = () => {
    setShowPassword(!showPassword);
  };

  const handleValidPassword = (validPassword: boolean) => {
    setValidPassword(validPassword);
  };

  const handleVerification = () => {
    setVerified(true);
  };

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
            <FormControl isRequired isInvalid={formatUserDetailsKey.firstName in errorMap}>
              <FormLabel>{formatUserDetailsKey.firstName}</FormLabel>
              <Input name="firstName" placeholder="Jane" size="md" />
              {getUserDetailsErrorMessage(errorMap, "firstName")}
            </FormControl>

            <FormControl isRequired marginTop={6} isInvalid={formatUserDetailsKey.lastName in errorMap}>
              <FormLabel>{formatUserDetailsKey.lastName}</FormLabel>
              <Input name="lastName" placeholder="Doe" size="md" />
              {getUserDetailsErrorMessage(errorMap, "lastName")}
            </FormControl>

            <FormControl isRequired marginTop={6} isInvalid={formatUserDetailsKey.dateOfBirth in errorMap}>
              <FormLabel>{formatUserDetailsKey.dateOfBirth}</FormLabel>
              <Input name="dateOfBirth" type="date" max={getMaxDateOfBirth()} size="md" />
              {getUserDetailsErrorMessage(errorMap, "dateOfBirth")}
            </FormControl>

            <FormControl isRequired marginTop={6} isInvalid={formatUserDetailsKey.ppsn in errorMap}>
              <FormLabel>{formatUserDetailsKey.ppsn}</FormLabel>
              <Input name="ppsn" placeholder="1234567AB" size="md" />
              {getUserDetailsErrorMessage(errorMap, "ppsn")}
            </FormControl>

            <FormControl isRequired marginTop={6} isInvalid={formatUserDetailsKey.address in errorMap}>
              <FormLabel>{formatUserDetailsKey.address}</FormLabel>
              <Input name="address" placeholder="UCD, Dublin 4, Co. Dublin, Ireland" size="md" />
              {getUserDetailsErrorMessage(errorMap, "address")}
            </FormControl>

            <FormControl isRequired marginTop={6} isInvalid={formatUserDetailsKey.phoneNo in errorMap}>
              <FormLabel>{formatUserDetailsKey.phoneNo}</FormLabel>
              <Input name="phoneNo" placeholder="0899123456" type="tel" size="md" />
              {getUserDetailsErrorMessage(errorMap, "phoneNo")}
            </FormControl>

            <FormControl isRequired marginTop={6} isInvalid={formatUserDetailsKey.nationality in errorMap}>
              <FormLabel>{formatUserDetailsKey.nationality}</FormLabel>
              <Input name="nationality" placeholder="Ireland" size="md" />
              {getUserDetailsErrorMessage(errorMap, "nationality")}
            </FormControl>

            <FormControl isRequired marginTop={6}>
              <FormLabel>{formatUserDetailsKey.gender}</FormLabel>
              <Select name="gender" size="md">
                <option value="FEMALE">Female</option>
                <option value="MALE">Male</option>
                <option value="OTHER">Other</option>
              </Select>
            </FormControl>

            <FormControl isRequired marginTop={6} isInvalid={formatUserDetailsKey.email in errorMap}>
              <FormLabel>{formatUserDetailsKey.email}</FormLabel>
              <Input name="email" type="email" placeholder="jane.doe@ucd.ie" size="md" />
              {getUserDetailsErrorMessage(errorMap, "email")}
            </FormControl>

            <FormControl isRequired marginTop={6}>
              <FormLabel>{formatUserDetailsKey.password}</FormLabel>
              <InputGroup>
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="*******"
                  size="md"
                  onChange={(event) => setPassword(event.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handlePasswordShow} variant="ghost">
                    {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl isRequired marginTop={6}>
              <FormLabel>{formatUserDetailsKey.matchingPassword}</FormLabel>
              <InputGroup>
                <Input
                  name="matchingPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="*******"
                  size="md"
                  onChange={(event) => setPasswordAgain(event.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handlePasswordShow} variant="ghost">
                    {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <PasswordChecklist
                rules={["minLength", "specialChar", "number", "capital", "match"]}
                minLength={8}
                value={password}
                valueAgain={passwordAgain}
                onChange={(isValid) => handleValidPassword(isValid)}
                iconSize={10}
                style={{ paddingTop: "10px", paddingBottom: "50px" }}
              />
            </FormControl>

            <Button
              colorScheme="teal"
              type="submit"
              width="full"
              mt={4}
              disabled={loading || !validPassword || !verified}
            >
              Submit
            </Button>
            <Center pt="50px">
              <ReCAPTCHA sitekey="6LdSRdAfAAAAAE5Qbv-Qg6vmiATbXK8SPJFDu9Ai" onChange={handleVerification} />
            </Center>

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

const mapUserDetailsErrors = (error?: Response<any>): { [key: string]: string } => {
  if (!error || !error.data) return {};
  const errorMessages: string[] = error.data.messages;
  const errorMap: { [key: string]: string } = {};
  errorMessages.forEach((e) => {
    const [k, v] = e.split(":");
    errorMap[k.trim()] = v.trim();
  });
  return errorMap;
};

const getUserDetailsErrorMessage = (errorMap: { [key: string]: string }, userDetailsKey: string) => {
  return (
    errorMap[formatUserDetailsKey[userDetailsKey as keyof UserDetailsKeys]] && (
      <FormErrorMessage>{errorMap[formatUserDetailsKey[userDetailsKey as keyof UserDetailsKeys]]}</FormErrorMessage>
    )
  );
};

const getMaxDateOfBirth = (): string => {
  const adultDOB = new Date();
  adultDOB.setFullYear(adultDOB.getFullYear() - 18);
  // YYYY-MM-DD
  return adultDOB.toLocaleDateString("en-GB").split("/").reverse().join("-");
};
