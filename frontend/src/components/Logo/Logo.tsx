import { Box, Text } from "@chakra-ui/react";

interface LogoProps {
  w: string;
  color: string[] | string;
}

export const Logo: React.FC<LogoProps> = (props): JSX.Element => {
  return (
    <Box {...props}>
      <Text fontSize="lg" fontWeight="bold">
        COVID-19 Vax Warden
      </Text>
    </Box>
  );
};
