import { Heading, List, ListIcon, ListItem, Text, VStack } from "@chakra-ui/react";
import * as statistics from "client/statistics";
import { Stats } from "client/types";
import { formatDate } from "client/util";
import useAuth from "hooks/useAuth";
import { useEffect, useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { MdCheckCircle } from "react-icons/md";

const doseString = (stats: Stats | undefined): string => {
  let doses = 0;
  if (stats) {
    if (stats.dosesReceived[2]) {
      doses = 2;
    } else if (stats.dosesReceived[1]) {
      doses = 1;
    }
  }
  return `Doses Received: ${doses}`;
};

const formatKey: { [k: string]: any } = {
  centre: "Registered for vaccination at",
  firstAppointment: "First appointment scheduled for",
  secondAppointment: "Second appointment scheduled for",
  firstVaccineType: "First vaccination type is",
  secondVaccineType: "Second vaccination type is",
};

const noBookingIndicator = "TBD";

const formatEntry = (k: string, v: any): string => {
  const formatValue = (k: string, v: any): string => {
    if (k.includes("Appointment") && v !== noBookingIndicator) return formatDate(v).split(":00")[0];
    return v;
  };

  let value = Object.keys(v)[0];
  if (typeof value !== "string") value = noBookingIndicator;
  return `${formatKey[k]} ${formatValue(k, value)}.`;
};

const entries = (stats: Stats | undefined): [string, any][] => {
  if (!stats) return [];
  return Object.entries(stats);
};

const keysToHide = ["dosesReceived", "nationality", "gender"];

export const Home: React.FC = (): JSX.Element => {
  const { currentUser, jwtToken } = useAuth();
  const [stats, setStats] = useState<Stats | undefined>(undefined);

  const fetchData = (token: string) => {
    statistics.getForUser(token).then((newStats) => setStats(newStats));
  };

  useEffect(() => {
    fetchData(jwtToken);
  }, [jwtToken]);

  return (
    <VStack spacing={5} pb="200px">
      <Heading size="md" textAlign="center">
        {currentUser.firstName} {currentUser.lastName}
      </Heading>
      <Text>Date of Birth: {formatDate(currentUser.dateOfBirth)}</Text>
      <Text style={{ fontWeight: "bold" }}>{doseString(stats)}</Text>
      <List>
        {entries(stats)
          .filter(([k, _]) => !keysToHide.includes(k))
          .map(([k, v]) => {
            const entry = formatEntry(k, v);
            const isDone = !entry.includes(noBookingIndicator);
            return (
              <ListItem>
                <ListIcon as={isDone ? MdCheckCircle : AiOutlineClockCircle} color={isDone ? "green" : "grey"} />
                {entry}
              </ListItem>
            );
          })}
      </List>
    </VStack>
  );
};
