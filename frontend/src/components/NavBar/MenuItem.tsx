import { Link, Text } from "@chakra-ui/react";
import React from "react";

interface MenuItem {
  to: string;
}

export const MenuItem: React.FC<MenuItem> = ({ children, to = "/", ...rest }): JSX.Element => {
  return (
    <Link href={to}>
      <Text {...rest}>{children}</Text>
    </Link>
  );
};
