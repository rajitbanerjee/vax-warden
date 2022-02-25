import { VStack } from "@chakra-ui/react";
import { Footer, NavBar } from "components";
import { AuthProvider } from "hooks/useAuth";
import { Forum, Home, Login, Logout, MyAccount, Registration, Statistics } from "pages";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const App: React.FC = (): JSX.Element => {
  return (
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <AuthProvider>
          <VStack minH="100vh">
            <NavBar />
            <Routes>
              <Route path="/" element={<Registration />} />
              <Route path="/home" element={<Home />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/myaccount" element={<MyAccount />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
            </Routes>
            <Footer />
          </VStack>
        </AuthProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

function ErrorFallback({ error, resetErrorBoundary }: any) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{JSON.stringify(error.message, null, 2)}</pre>
      <button onClick={resetErrorBoundary}>Try again!</button>
    </div>
  );
}
