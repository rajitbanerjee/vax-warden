import { Text } from "@chakra-ui/react";
import * as statistics from "client/statistics";
import { useEffect, useState } from "react";
import { Stats } from "client/types";
import { XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries } from "react-vis";

export const Statistics: React.FC = (): JSX.Element => {
  const [stats, setStats] = useState<Stats | undefined>(undefined);

  const fetchData = () => {
    statistics.getAll().then((newStats) => setStats(newStats));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <Text>{JSON.stringify(stats)}</Text>;
};
