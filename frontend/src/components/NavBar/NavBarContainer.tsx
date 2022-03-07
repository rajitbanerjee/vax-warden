import { Flex } from "@chakra-ui/react";
import colors from "custom/colors";

export const NavBarContainer: React.FC = ({ children, ...props }): JSX.Element => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      width="100%"
      marginBottom={8}
      padding="2rem"
      bg={["primary.500", "primary.500", "transparent", "transparent"]}
      color={[colors.fg, colors.fg, "primary.700", "primary.700"]}
      {...props}
    >
      {children}
    </Flex>
  );
};
