import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Select, Text, VStack } from "@chakra-ui/react";
import { BookingDetailsKeys, Vaccination } from "client/types";
import { delay, formatDate } from "client/util";
import { bookFirstDose } from "client/vaccination";
import useAuth from "hooks/useAuth";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Response } from "redaxios";

const formatBookingDetailsKey: BookingDetailsKeys = {
  centre: "Vaccination Centre",
  firstAppointment: "Slot",
};

const vaccinationCentres = ["Citywest", "Croke Park", "Swords", "Richmond Barracks", "RDS", "Ongar", "TUD", "DCU"];

export const Booking: React.FC = (): JSX.Element => {
  const { currentUser, jwtToken, loading } = useAuth();
  const [submit, setSubmit] = useState<boolean>(false);
  const [error, setError] = useState<Response<any> | undefined>(undefined);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const vaccination: Vaccination = {
      centre: formData.get("centre") as string,
      firstAppointment: formData.get("firstAppointment") as unknown as Date,
    };
    bookFirstDose(vaccination, jwtToken)
      .then(() => setSubmit(true))
      .then(() => delay(1000))
      .then(() => navigate("/home"))
      .catch((e) => setError(e.data.messages));
  };

  return (
    <Flex width="full" align="center" justifyContent="center" pb="100px">
      <Box p={2} w="40%">
        <VStack textAlign="center" spacing={5}>
          <Heading size="md">Vaccination First Dose Appointment Booking</Heading>
          <Text>
            {currentUser.firstName} {currentUser.lastName} (D.O.B: {formatDate(currentUser.dateOfBirth, true)})
          </Text>
        </VStack>

        <Box my={10} textAlign="left">
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel>{formatBookingDetailsKey.centre}</FormLabel>
              <Select name="centre" size="md">
                {vaccinationCentres.map((c, i) => (
                  <option key={i.toString()} value={c}>
                    {c}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl isRequired marginTop={6}>
              <FormLabel>{formatBookingDetailsKey.firstAppointment}</FormLabel>
              <Input name="firstAppointment" type="datetime-local" min={getMinDate()} max={getMaxDate()} size="md" />
            </FormControl>

            <Button colorScheme="teal" type="submit" width="full" mt={10} disabled={loading || submit}>
              Submit
            </Button>
            <Button
              variant="outline"
              width="full"
              my={5}
              disabled={loading || submit}
              onClick={() => navigate("/home")}
            >
              Cancel
            </Button>
          </form>
        </Box>

        {submit ? (
          <Text align="center" color="green">
            Appointment booked successfully!
          </Text>
        ) : (
          <></>
        )}

        {error ? (
          <Text align="center" color="red">
            {error}
          </Text>
        ) : (
          <></>
        )}
      </Box>
    </Flex>
  );
};

// Now
const getMinDate = (): string => {
  const s = new Date().toISOString();
  return s.substring(0, s.length - 8);
};

// 1 month from now
const getMaxDate = (): string => {
  const date = new Date();
  date.setMonth(date.getMonth() + 1);
  const s = date.toISOString();
  return s.substring(0, s.length - 8);
};
