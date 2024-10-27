import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";

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

export const useCreatePet = () => {
  return useMutation<
    AxiosResponse,
    AxiosError,
    { name: string; type: string; gene: string }
  >({
    mutationFn: ({ name, type, gene }) =>
      Fetcher.post(ApiRouteConstants.Pets, { name, type, gene })
        .then((r) => r)
        .catch((e) => {
          if (isAxiosError(e)) {
            console.log(e.response?.data);
          }

          throw e;
        }),
  });
};
