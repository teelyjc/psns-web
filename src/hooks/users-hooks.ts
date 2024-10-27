import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";

import { ApiRoutes as ApiRouteConstants, Keys } from "@/libs/constants";
import Fetcher from "@/libs/fetcher";
import { Response, User } from "@/types.d";

export const useEditUserPreferences = () => {
  return useMutation<
    AxiosResponse,
    AxiosError,
    { id: string; firstname: string; lastname: string }
  >({
    mutationFn: ({ id, firstname, lastname }) =>
      Fetcher.patch(ApiRouteConstants.UpdateUserById(id), {
        firstname,
        lastname,
      })
        .then((r) => {
          return r;
        })
        .catch((e) => {
          if (isAxiosError(e)) {
            console.log(e.response?.data);
          }
          throw e;
        }),
  });
};

export const useSignUpMutation = () => {
  return useMutation<
    AxiosResponse,
    AxiosError,
    { username: string; password: string; confirmPassword: string }
  >({
    mutationFn: async ({ username, password, confirmPassword }) => {
      return Fetcher.post(ApiRouteConstants.SignUp, {
        username,
        password,
        confirmPassword,
      })
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

export const useUsersQuery = () => {
  return useQuery({
    queryKey: [Keys.Users],
    queryFn: async () =>
      Fetcher.get<Response<User[]>>("/users")
        .then((r) => {
          console.log(r.data);
          return r.data.data;
        })
        .catch((e) => {
          if (isAxiosError(e)) {
            console.log(e.response?.data);
          }

          throw e;
        }),
  });
};
