import { Text } from "@chakra-ui/react";
import { useEffect } from "react";

export const Home: React.FC = (): JSX.Element => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <Text>Hello, Home!</Text>;
};
