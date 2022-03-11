import { Flex, Spinner, Text } from "@chakra-ui/react";
import * as statistics from "client/statistics";
import { ChartData, Stats } from "client/types";
import { BarChart } from "components";
import React, { useEffect, useState } from "react";

const statsKeys: { [key in keyof Stats]: string } = {
  centre: "Vaccination Bookings by Centre",
  gender: "Vaccinations by Gender",
  nationality: "Vaccinations by Nationality",
  ageGroup: "Vaccinations by Age Group",
  firstVaccineType: "First Doses Administered",
  secondVaccineType: "Second Doses Administered",
  dosesReceived: "Users by Doses Received",
};

export const formatStatsValues: { [key: string]: string } = {
  // Gender
  MALE: "Male",
  FEMALE: "Female",
  OTHER: "Other",

  // VaccineType
  PFIZER_BIONTECH: "Pfizer-BioNTech",
  MODERNA: "Moderna",
};

const createPointsFromStats = (key: keyof Stats, stats?: Stats): ChartData => {
  if (!stats || !stats[key]) return [];
  const statsValue = stats[key];
  if (!statsValue) return [];
  return Object.entries(statsValue).map(([k, v]) => {
    const formattedY = k in formatStatsValues ? formatStatsValues[k] : k;
    return { x: v, y: formattedY };
  });
};

const makeBarCharts = (loading: boolean, stats?: Stats): JSX.Element[] | JSX.Element => {
  if (loading) return <Spinner />;
  const colors = ["teal", "green"];
  let isEmpty = true;
  const charts = Object.entries(statsKeys).map(([k, v], i) => {
    const data = createPointsFromStats(k as keyof Stats, stats);
    // Only make chart if data exists
    if (data.length > 0) {
      isEmpty = false;
      return <BarChart key={i.toString()} heading={v} data={data} colorRange={colors} />;
    }
    return <React.Fragment key={i}></React.Fragment>;
  });
  if (isEmpty) return <Text>Nothing to show!</Text>;
  return charts;
};

export const Statistics: React.FC = (): JSX.Element => {
  const [stats, setStats] = useState<Stats | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = () => {
    setLoading(true);
    statistics
      .getAll()
      .then((newStats) => setStats(newStats))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Flex
      justify="center"
      direction="row"
      wrap="wrap"
      gap="3rem"
      paddingLeft="10rem"
      paddingRight="10rem"
      paddingBottom="5rem"
    >
      {makeBarCharts(loading, stats)}
    </Flex>
  );
};
