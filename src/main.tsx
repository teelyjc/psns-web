import "bootstrap/dist/css/bootstrap.min.css";
import "@/main.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ProtectedRoute from "@/components/features/ProtectedRoute";
import { Routes as RouteConstants } from "@/libs/constants";
import SignInPage from "@/pages/auth/SignInPage";
import SignUpPage from "@/pages/auth/SignUpPage";
import HomePage from "@/pages/HomePage";
import Preferences from "@/pages/preferences/Preferences";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path={RouteConstants.Home} element={<HomePage />} />

          <Route path={RouteConstants.SignIn} element={<SignInPage />} />
          <Route path={RouteConstants.SignUp} element={<SignUpPage />} />

          <Route
            path={RouteConstants.Preferences}
            element={
              <ProtectedRoute>
                <Preferences />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
