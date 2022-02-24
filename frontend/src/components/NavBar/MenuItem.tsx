import { Link, Text } from "@chakra-ui/react";

interface MenuItemProps {
  to: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({ children, to = "/", ...rest }): JSX.Element => {
  return (
    <Link href={to}>
      <Text {...rest}>{children}</Text>
    </Link>
  );
};
