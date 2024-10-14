import { useQuery } from "@tanstack/react-query";
import { AxiosError, isAxiosError } from "axios";

import { ApiRoutes as ApiRouteConstants } from "@/libs/constants";
import Fetcher from "@/libs/fetcher";
import { Pet, Response } from "@/types.d";

export const usePetsQuery = () => {
  return useQuery({
    queryKey: ["pets"],
    queryFn: () =>
      Fetcher.get<Response<Pet[]>>(ApiRouteConstants.Pets)
        .then((response) => {
          return response.data.data;
        })
        .catch((e: AxiosError) => {
          if (isAxiosError(e)) {
            console.log(e.response?.data);
          }
          throw e;
        }),
  });
};
