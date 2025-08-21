import { useCallback, useState } from "react";
import { useCallServices } from "./use_call_services";
import { services } from "@/api/resource/rickAndMorty/index";
import type {
  ApiResponse,
  Character,
  CharacterFilters,
} from "@/api/resource/rickAndMorty/types/api";

export const useCharacters = () => {
  const { callEndpoint } = useCallServices();
  const [characters, setCharacters] = useState<ApiResponse<Character[]>>();

  const allCharacters = useCallback(
    async (params: CharacterFilters) => {
      try {
        const response = (await callEndpoint(
          services.allCharacterService(params)
        )) as unknown as ApiResponse<Character[]>;

        setCharacters(response);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    },
    [callEndpoint]
  );

  return { allCharacters, characters };
};
