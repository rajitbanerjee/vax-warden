import { Text, VStack, Heading, HStack } from "@chakra-ui/react";
import * as statistics from "client/statistics";
import { useEffect, useState } from "react";
import { Stats } from "client/types";
import { XYPlot, VerticalBarSeries, XAxis, YAxis, LabelSeries, VerticalBarSeriesPoint } from "react-vis";

const createPoints = (dict: { [key: string]: number }): (any[] | VerticalBarSeriesPoint)[] => {
  let points: any[] | VerticalBarSeriesPoint = [];
  Object.entries(dict).forEach(([key, value]) => {
    points.push({ x: key, y: value });
  });
  return points;
};

const centre = (stats: Stats | undefined): (any[] | VerticalBarSeriesPoint)[] => {
  if (!stats) return [];
  return createPoints(stats.centre);
};

const gender = (stats: Stats | undefined): (any[] | VerticalBarSeriesPoint)[] => {
  if (!stats) return [];
  return createPoints(stats.gender);
};

const nationality = (stats: Stats | undefined): (any[] | VerticalBarSeriesPoint)[] => {
  if (!stats) return [];
  return createPoints(stats.nationality);
};

const doses = (stats: Stats | undefined): (any[] | VerticalBarSeriesPoint)[] => {
  if (!stats) return [];
  return createPoints(stats.dosesReceived);
};

export const Statistics: React.FC = (): JSX.Element => {
  const [stats, setStats] = useState<Stats | undefined>(undefined);

  const fetchData = () => {
    statistics.getAll().then((newStats) => setStats(newStats));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const chartWidth = 600;
  const chartHeight = 200;
  const chartDomain = [0, 10];

  return (
    <VStack spacing={5} pb="200px">
      <Text>{JSON.stringify(stats)}</Text>
      <HStack spacing={5} pb="200px">
        <VStack spacing={5} pb="200px">
          <Heading size="md" textAlign="center">
            Vaccination bookings by Centre
          </Heading>
          <XYPlot width={chartWidth} height={chartHeight} yDomain={chartDomain} xType="ordinal">
            <XAxis />
            <YAxis />
            <VerticalBarSeries data={centre(stats)} barWidth={0.8} />
          </XYPlot>
        </VStack>

        <VStack spacing={5} pb="200px">
          <Heading size="md" textAlign="center">
            Vaccination bookings by Gender
          </Heading>
          <XYPlot width={chartWidth} height={chartHeight} yDomain={chartDomain} xType="ordinal">
            <XAxis />
            <YAxis />
            <VerticalBarSeries data={gender(stats)} barWidth={0.8} />
          </XYPlot>
        </VStack>

        <VStack spacing={5} pb="200px">
          <Heading size="md" textAlign="center">
            Vaccination bookings by Nationality
          </Heading>
          <XYPlot width={chartWidth} height={chartHeight} yDomain={chartDomain} xType="ordinal">
            <XAxis />
            <YAxis />
            <VerticalBarSeries data={nationality(stats)} barWidth={0.8} />
          </XYPlot>
        </VStack>
      </HStack>

      <HStack spacing={5} pb="200px">
        <VStack spacing={5} pb="200px">
          <Heading size="md" textAlign="center">
            Total Doses Received
          </Heading>
          <XYPlot width={chartWidth} height={chartHeight} yDomain={chartDomain} xType="ordinal">
            <XAxis />
            <YAxis />
            <VerticalBarSeries data={doses(stats)} barWidth={0.8} />
          </XYPlot>
        </VStack>
      </HStack>
    </VStack>
  );
};
