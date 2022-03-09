import { Flex } from "@chakra-ui/react";
import * as statistics from "client/statistics";
import { ChartData, Stats } from "client/types";
import { BarChart } from "components";
import { useEffect, useState } from "react";

const statsKeys: { [key in keyof Stats]: string } = {
  centre: "Vaccination bookings by centre",
  gender: "Vaccination bookings by gender",
  nationality: "Vaccination bookings by nationality",
  firstVaccineType: "First doses administered",
  secondVaccineType: "Second doses administered",
  dosesReceived: "Users by doses received",
};

const createPointsFromStats = (key: keyof Stats, stats?: Stats): ChartData => {
  if (!stats || !stats[key]) return [];
  const statsValue = stats[key];
  if (!statsValue) return [];
  return Object.entries(statsValue).map(([k, v]) => ({ x: k, y: v }));
};

const makeBarCharts = (stats?: Stats): JSX.Element[] => {
  const colors = ["teal", "green"];
  return Object.entries(statsKeys).map(([k, v], i) => {
    const data = createPointsFromStats(k as keyof Stats, stats);
    // Only make chart if data exists
    return data.length > 0 ? <BarChart heading={v} data={data} color={colors[i % 2]} /> : <></>;
  });
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
