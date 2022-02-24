import { Text, VStack } from "@chakra-ui/react";
import Footer from "sections/Footer";

export const App: React.FC = (): JSX.Element => {
  return (
    <VStack minH="100vh">
      <Text>Hello, VaxWarden!</Text>
      <Footer />
    </VStack>
  );
};
