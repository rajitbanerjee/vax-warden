import { Button, Heading, List, ListIcon, ListItem, Text, VStack } from "@chakra-ui/react";
import * as statistics from "client/statistics";
import { Stats } from "client/types";
import { formatDate } from "client/util";
import useAuth from "hooks/useAuth";
import { AdminHome } from "pages/AdminHome";
import { formatUserDetailsKey } from "pages/MyAccount";
import React, { useEffect, useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { MdCheckCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { formatStatsValues } from "./Statistics";

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
const keysToHide = ["dosesReceived", "nationality", "gender", "ageGroup"];

const formatUserStatsEntry = (k: string, v: any): string => {
  const formatUserStatsValue = (k: string, v: any): string => {
    if (k.includes("Appointment") && v !== noBookingIndicator) return formatDate(v);
    if (v in formatStatsValues) return formatStatsValues[v];
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

const isEmpty = (obj: { [key: string]: any } | undefined) => (obj ? Object.keys(obj).length === 0 : true);

export const Home: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { currentUser, jwtToken, loading, isAdmin } = useAuth();
  const [stats, setStats] = useState<Stats | undefined>(undefined);
  const [isFirstAppointmentBooked, setFirstAppointmentBooked] = useState<boolean>(false);
  const [isFirstVaccineReceived, setFirstVaccineReceived] = useState<boolean>(false);
  const [isSecondVaccineReceived, setSecondVaccineReceived] = useState<boolean>(false);

  const fetchData = (token: string) => {
    statistics
      .getForUser(token)
      .then((stats) => {
        setStats(stats);
        setFirstAppointmentBooked(!isEmpty(stats.firstAppointment));
        setFirstVaccineReceived(!isEmpty(stats.firstVaccineType));
        setSecondVaccineReceived(!isEmpty(stats.secondVaccineType));
      })
      .catch((e) => console.log(e.data));
  };

  const makeButton = (): JSX.Element => {
    if (isFirstAppointmentBooked && !isFirstVaccineReceived) {
      return (
        <Button onClick={() => navigate("/cancellation")} disabled={loading}>
          Cancel appointment
        </Button>
      );
    } else if (isFirstVaccineReceived && isSecondVaccineReceived) {
      return <Text align="center">Fully vaccinated!</Text>;
    } else if (!isFirstAppointmentBooked) {
      return (
        <Button onClick={() => navigate("/booking")} disabled={loading}>
          Book first dose
        </Button>
      );
    } else {
      return <></>;
    }
  };

  useEffect(() => {
    fetchData(jwtToken);
  }, [jwtToken]);

  return isAdmin ? (
    <AdminHome />
  ) : (
    <VStack spacing={5} pb="200px">
      <Heading size="md" textAlign="center">
        {currentUser.firstName} {currentUser.lastName}
      </Heading>
      <Text>
        {formatUserDetailsKey.dateOfBirth}: {formatDate(currentUser.dateOfBirth, true)}
      </Text>
      <Text style={{ fontWeight: "bold" }}>{doseString(stats)}</Text>

      {makeButton()}

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
