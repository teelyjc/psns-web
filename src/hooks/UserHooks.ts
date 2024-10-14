import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";

import { ApiRoutes as ApiRouteConstants } from "@/libs/constants";
import Fetcher from "@/libs/fetcher";

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
