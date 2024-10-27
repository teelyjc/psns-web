import "bootstrap/dist/css/bootstrap.min.css";
import "@/main.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes as RouterRoutes } from "react-router-dom";

import { ProtectedRoute } from "@/components/features/protected-route";
import { Routes } from "@/libs/constants";
import Users from "@/pages/admin/users";
import SignInPage from "@/pages/auth/signin";
import SignUpPage from "@/pages/auth/signup";
import IndexPage from "@/pages/index";
import Preferences from "@/pages/settings/preferences";

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
        <RouterRoutes>
          <Route path={Routes.Home} element={<IndexPage />} />

          <Route path={Routes.SignIn} element={<SignInPage />} />
          <Route path={Routes.SignUp} element={<SignUpPage />} />

          <Route
            path={Routes.Preferences}
            element={<ProtectedRoute children={<Preferences />} />}
          />

          <Route
            path={Routes.Users}
            element={<ProtectedRoute children={<Users />} />}
          />
        </RouterRoutes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
