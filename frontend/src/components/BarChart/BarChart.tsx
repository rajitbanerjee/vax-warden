import { Heading, VStack } from "@chakra-ui/react";
import { ChartData } from "client/types";
import useWindowDimensions from "hooks/useWindowDimentions";
import { HorizontalGridLines, LabelSeries, VerticalBarSeries, XAxis, XYPlot, YAxis } from "react-vis";

interface BarChartProps {
  heading: string;
  data: ChartData;
  color: string;
}

export const BarChart: React.FC<BarChartProps> = ({ heading, data, color }): JSX.Element => {
  const { height, width } = useWindowDimensions();
  const chartWidth = width / 5;
  const chartHeight = height / 5;
  const maxHeight = Math.max(...data.map((p) => p.y))!;
  const chartDomain = [0, maxHeight + 3];

  return (
    <VStack spacing={10} pb="2rem">
      <Heading size="sm" textAlign="center">
        {heading}
      </Heading>
      <XYPlot width={chartWidth} height={chartHeight} yDomain={chartDomain} xType="ordinal" color={color}>
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <VerticalBarSeries data={data} barWidth={0.75} />
      </XYPlot>
    </VStack>
  );
};
