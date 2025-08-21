import { type Dependencies } from "..";
import type { ApiResponse, Character, CharacterFilters } from "../types/api";

export const build = ({ http, abortController }: Dependencies) => {
  const PATH = "/character";
  const execute = (params: CharacterFilters) => {
    const controller = abortController();

    return {
      response: http.get<ApiResponse<Character[]>>(`${PATH}`, {
        params,
        signal: controller.signal,
      }),
      controller,
    };
  };
  return execute;
};
