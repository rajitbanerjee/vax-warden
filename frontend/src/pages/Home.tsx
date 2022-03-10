import { Button, Heading, List, ListIcon, ListItem, Text, VStack } from "@chakra-ui/react";
import * as statistics from "client/statistics";
import { Stats } from "client/types";
import { formatDate } from "client/util";
import useAuth from "hooks/useAuth";
import { formatUserDetailsKey } from "pages/MyAccount";
import { useEffect, useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { MdCheckCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";

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

const formatUserStatsKey: { [k: string]: any } = {
  centre: "Registered for vaccination at",
  firstAppointment: "First appointment scheduled for",
  secondAppointment: "Second appointment scheduled for",
  firstVaccineType: "First vaccination type is",
  secondVaccineType: "Second vaccination type is",
};

const noBookingIndicator = "TBD";
const keysToHide = ["dosesReceived", "nationality", "gender"];

const formatUserStatsEntry = (k: string, v: any): string => {
  const formatUserStatsValue = (k: string, v: any): string => {
    if (k.includes("Appointment") && v !== noBookingIndicator) return formatDate(v).split(":00")[0];
    return v;
  };

  let value = Object.keys(v)[0];
  if (typeof value !== "string") value = noBookingIndicator;
  return `${formatUserStatsKey[k]} ${formatUserStatsValue(k, value)}.`;
};

const userStatsEntries = (stats: Stats | undefined): [string, any][] => {
  if (!stats) return [];
  return Object.entries(stats);
};

const isEmpty = (obj: { [key: string]: any } | undefined) => (obj ? Object.keys(obj).length === 0 : false);

export const Home: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { currentUser, jwtToken, loading } = useAuth();
  const [stats, setStats] = useState<Stats | undefined>(undefined);
  const [isBooked, setBooked] = useState<boolean>(false);

  const fetchData = (token: string) => {
    statistics
      .getForUser(token)
      .then((newStats) => setStats(newStats))
      .catch((e) => console.log(e.data));
  };

  useEffect(() => {
    fetchData(jwtToken);
    setBooked(isEmpty(stats?.firstAppointment) || isEmpty(stats?.secondAppointment));
  }, [jwtToken, stats?.firstAppointment, stats?.secondAppointment]);

  return (
    <VStack spacing={5} pb="200px">
      <Heading size="md" textAlign="center">
        {currentUser.firstName} {currentUser.lastName}
      </Heading>
      <Text>
        {formatUserDetailsKey.dateOfBirth}: {formatDate(currentUser.dateOfBirth)}
      </Text>
      <Text style={{ fontWeight: "bold" }}>{doseString(stats)}</Text>

      {!isBooked ? (
        <Button onClick={() => navigate("/booking")} disabled={loading}>
          Book first dose
        </Button>
      ) : (
        <Button onClick={() => navigate("/cancellation")} disabled={loading}>
          Cancel appointment
        </Button>
      )}

      <List>
        {userStatsEntries(stats)
          .filter(([k, _]) => !keysToHide.includes(k))
          .map(([k, v], i) => {
            const entry = formatUserStatsEntry(k, v);
            const isDone = !entry.includes(noBookingIndicator);
            return (
              <ListItem key={i.toString()}>
                <ListIcon as={isDone ? MdCheckCircle : AiOutlineClockCircle} color={isDone ? "green" : "grey"} />
                {entry}
              </ListItem>
            );
          })}
      </List>
    </VStack>
  );
};
