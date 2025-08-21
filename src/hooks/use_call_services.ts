/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpErrorHandler } from "@/api/handlers/error";
import { type AxiosResponse } from "axios";
import { useEffect, useState, useCallback, useRef } from "react";

type TServiceResponse<T> = {
  response: Promise<AxiosResponse<T>>;
  controller: AbortController;
};

export const useCallServices = () => {
  const [loading, setLoading] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);

  const callEndpoint = useCallback(
    async <D>(
      axiosCall: TServiceResponse<D>,
      options?: { responseType?: string }
    ) => {
      setLoading(true);

      if (axiosCall.controller) {
        controllerRef.current = axiosCall.controller;
      }

      try {
        const response = await axiosCall.response;

        if (options?.responseType === "blob") {
          return new Blob([response.data as BlobPart], {
            type: response.headers["content-type"],
          });
        }

        return response.data;
      } catch (err: any) {
        const handledError = HttpErrorHandler(err);

        throw handledError;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const cancelEndpoint = useCallback(() => {
    setLoading(false);
    if (controllerRef.current) {
      controllerRef.current.abort();
      controllerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      cancelEndpoint();
    };
  }, [cancelEndpoint]);

  return { loading, callEndpoint, cancelEndpoint };
};
