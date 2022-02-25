import { VStack } from "@chakra-ui/react";
import { Footer, NavBar } from "components";
import useAuth, { AuthProvider } from "hooks/useAuth";
import { Forum, Home, Login, Logout, MyAccount, Registration, Statistics } from "pages";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";

export const App: React.FC = (): JSX.Element => {
  return (
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <AuthProvider>
          <VStack minH="100vh">
            <NavBar />
            <Routes>
              <Route path="/" element={<Registration />} />
              <Route path="/login" element={<Login />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route
                path="/home"
                element={
                  <RequireAuth>
                    <Home />
                  </RequireAuth>
                }
              />
              <Route
                path="/forum"
                element={
                  <RequireAuth>
                    <Forum />
                  </RequireAuth>
                }
              />
              <Route
                path="/myaccount"
                element={
                  <RequireAuth>
                    <MyAccount />
                  </RequireAuth>
                }
              />
              <Route
                path="/logout"
                element={
                  <RequireAuth>
                    <Logout />
                  </RequireAuth>
                }
              />
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

function RequireAuth({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
