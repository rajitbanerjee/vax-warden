import { Flex, Text } from "@chakra-ui/react";
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

const createPointsFromStats = (key: keyof Stats, stats?: Stats): ChartData => {
  if (!stats || !stats[key]) return [];
  const statsValue = stats[key];
  if (!statsValue) return [];
  return Object.entries(statsValue).map(([k, v]) => ({ x: k, y: v }));
};

const makeBarCharts = (stats?: Stats): JSX.Element[] | JSX.Element => {
  const colors = ["teal", "green"];
  let isEmpty = true;
  const charts = Object.entries(statsKeys).map(([k, v], i) => {
    const data = createPointsFromStats(k as keyof Stats, stats);
    // Only make chart if data exists
    if (data.length > 0) {
      isEmpty = false;
      return <BarChart key={i.toString()} heading={v} data={data} color={colors[i % 2]} />;
    }
    return <React.Fragment key={i}></React.Fragment>;
  });
  if (isEmpty) return <Text>Nothing to show!</Text>;
  return charts;
};

export const Statistics: React.FC = (): JSX.Element => {
  const [stats, setStats] = useState<Stats | undefined>(undefined);

  const fetchData = () => {
    statistics.getAll().then((newStats) => setStats(newStats));
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
      {makeBarCharts(stats)}
    </Flex>
  );
};
