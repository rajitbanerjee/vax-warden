import { Box, Text } from "@chakra-ui/react";

export const Footer: React.FC = (): JSX.Element => {
  return (
    <Box position="absolute" bottom={0} width="1.0" pb="25px">
      <Text>&copy; {getYearRange()} Vax Warden (COMP47660: Secure Software Engineering)</Text>
    </Box>
  );
};

const getYearRange = (): string => {
  const start = 2022;
  const curr = new Date().getFullYear();
  return curr === start ? curr.toString() : `${start}-${curr}`;
};
