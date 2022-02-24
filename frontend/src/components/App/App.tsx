import { Text, VStack } from "@chakra-ui/react";
import Footer from "components/Footer";
import NavBar from "components/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const App: React.FC = (): JSX.Element => {
  return (
    <BrowserRouter>
      <VStack minH="100vh">
        <NavBar />
        <Routes>
          <Route path="/" element={<LoginContainer />} />
          <Route path="/home" element={<DefaultContainer />} />
        </Routes>
        <Footer />
      </VStack>
    </BrowserRouter>
  );
};

// TODO will not need these later, with auth context modifying navbar
const DefaultContainer: React.FC = (): JSX.Element => <Text>Hello, Home!</Text>;
const LoginContainer = () => <Text>Hello, Login!</Text>;
