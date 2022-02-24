import { VStack } from "@chakra-ui/react";
import { Footer, NavBar } from "components";
import { AuthProvider } from "hooks/useAuth";
import { Forum, Home, MyAccount, Registration, Statistics } from "pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const App: React.FC = (): JSX.Element => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <VStack minH="100vh">
          <NavBar />
          <Routes>
            <Route path="/" element={<Registration />} />
            <Route path="/home" element={<Home />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/myaccount" element={<MyAccount />} />
          </Routes>
          <Footer />
        </VStack>
      </AuthProvider>
    </BrowserRouter>
  );
};
