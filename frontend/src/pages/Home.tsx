import { Heading, Text, VStack, UnorderedList, ListItem } from "@chakra-ui/react";
import * as statistics from "client/statistics";
import { Statistics } from "client/types";
import { formatDate } from "client/util";
import useAuth from "hooks/useAuth";
import { useEffect, useState } from "react";
import type { Response } from "redaxios";

const doseString = (stats: Statistics | undefined): string => {
  let doses = 0;
  if (stats !== undefined) {
    if (stats.dosesReceived[2] !== undefined) {
      doses = 2;
    } else if (stats.dosesReceived[1] !== undefined) {
      doses = 1;
    }
  }
  return `DOSES RECEIVED: ${doses}`;
};
const formatKey: { [k: string]: any } = {
  centre: "Registered for vaccination at",
  firstAppointment: "First appointment scheduled for",
  secondAppointment: "Second appointment scheduled for",
  firstVaccineType: "First vaccination type is",
  secondVaccineType: "Second vaccination type is",
};

const noBookingIndicator = "TBD";
const formatValue = (k: string, v: any): string => {
  if (k.includes("Appointment") && v !== noBookingIndicator) return formatDate(v).split(":00")[0];
  return v;
};

const formatEntry = (k: string, v: any): string => {
  let value = Object.keys(v)[0];
  if (typeof value !== "string") {
    value = noBookingIndicator;
  }
  return `${formatKey[k]} ${formatValue(k, value)}`;
};

const entries = (stats: Statistics | undefined): [string, any][] => {
  if (stats === undefined) {
    return [];
  }
  return Object.entries(stats);
};
export const Home: React.FC = (): JSX.Element => {
  const { currentUser, jwtToken } = useAuth();
  const [stats, setStats] = useState<Statistics | undefined>(undefined);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Response<any> | null>();

  const fetchData = (token: string) => {
    setLoading(true);
    statistics
      .getForUser(token)
      .then((newStats) => setStats(newStats))
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData(jwtToken);
  }, [jwtToken]);

  const keysToHide = ["dosesReceived", "nationality", "gender"];

  return (
    <VStack spacing={5} pb="200px">
      <Heading size="md" textAlign="center">
        {currentUser.firstName} {currentUser.lastName}
      </Heading>
      <Text>Date of Birth: {formatDate(currentUser.dateOfBirth)}</Text>
      <Text style={{ fontWeight: "bold" }}>{doseString(stats)}</Text>
      <UnorderedList>
        {entries(stats)
          .filter(([k, _]) => !keysToHide.includes(k))
          .map(([k, v]) => (
            <ListItem>{formatEntry(k, v)}</ListItem>
          ))}
      </UnorderedList>
    </VStack>
  );
};
