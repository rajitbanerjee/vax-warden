import { Heading, VStack } from "@chakra-ui/react";
import { ChartData } from "client/types";
import useWindowDimensions from "hooks/useWindowDimensions";
import { useState } from "react";
import { HorizontalBarSeries, HorizontalGridLines, VerticalGridLines, XAxis, XYPlot, YAxis } from "react-vis";
import "react-vis/dist/style.css";

interface BarChartProps {
  heading: string;
  data: ChartData;
  colorRange: string[];
}

export const BarChart: React.FC<BarChartProps> = ({ heading, data, colorRange }): JSX.Element => {
  const [index, setIndex] = useState<number | null>(null);
  const { height, width } = useWindowDimensions();
  const chartWidth = width / 5;
  const chartHeight = height / 5;
  const maxWidth = Math.max(...data.map((p) => p.x));
  const chartDomain = [0, maxWidth < 4 ? maxWidth + 3 : Math.floor(maxWidth * 1.3)];
  const interactiveData = data.map((d, i) => ({ ...d, color: i === index ? 1 : 0 }));

  return (
    <VStack spacing={10} pb="2rem">
      <Heading size="sm" textAlign="center">
        {heading}
      </Heading>
      <XYPlot
        width={chartWidth}
        height={chartHeight}
        margin={{ left: chartWidth / 2 }}
        xDomain={chartDomain}
        yType="ordinal"
        colorDomain={[0, 1]}
        colorRange={colorRange}
        onMouseLeave={() => setIndex(null)}
      >
        <HorizontalGridLines />
        <VerticalGridLines />
        <XAxis />
        <YAxis />
        <HorizontalBarSeries data={interactiveData} barWidth={0.5} onNearestXY={(_, { index }) => setIndex(index)} />
      </XYPlot>
    </VStack>
  );
};
