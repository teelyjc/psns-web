import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";

import { ApiRoutes as ApiRouteConstants, Keys } from "@/libs/constants";
import Fetcher from "@/libs/fetcher";
import { Response, User } from "@/types.d";

export const useSignInMutation = () => {
  return useMutation<
    AxiosResponse,
    AxiosError,
    { username: string; password: string }
  >({
    mutationFn: async ({ username, password }) => {
      return Fetcher.post(ApiRouteConstants.SignIn, { username, password })
        .then((r) => r)
        .catch((e) => {
          if (isAxiosError(e)) {
            console.log(e.response?.data);
          }
          throw e;
        });
    },
  });
};

export const useSignOutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return Fetcher.delete(ApiRouteConstants.SignOut)
        .then((r) => {
          queryClient.resetQueries({ queryKey: [Keys.CurrentUser] });
          return r;
        })
        .catch((e) => {
          if (isAxiosError(e)) {
            console.log(e.response?.data);
          }
          throw e;
        });
    },
  });
};

export const useCurrentUserQuery = () => {
  return useQuery({
    queryKey: [Keys.CurrentUser],
    queryFn: async () => {
      return Fetcher.get<Response<User>>(ApiRouteConstants.Authenticate)
        .then((r) => r.data.data)
        .catch((e) => {
          if (isAxiosError(e)) {
            console.log(e.response?.data);
          }
          throw new Error(e);
        });
    },
    retry: false,
  });
};
