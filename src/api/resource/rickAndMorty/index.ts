import API_BASE_PATHS from "@/constants/api_paths";
import { abortController } from "@/packages/abort_controller";
import { type HttpHandler, axios } from "@/packages/http/http_client";

import { build as buildAllCharacters } from "./services/all_character";

export type Dependencies = {
  http: HttpHandler;
  abortController: () => AbortController;
};

const http = axios.create({
  baseURL: API_BASE_PATHS.rickAndMortyAPI,
});

const dependencies: Dependencies = {
  http,
  abortController,
};

export const allCharacterService = buildAllCharacters(dependencies);

export const services = {
  allCharacterService,
};
