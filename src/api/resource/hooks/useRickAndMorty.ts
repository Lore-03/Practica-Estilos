import { useState, useEffect, useCallback } from "react";
import { rickAndMortyApi } from "../rickAndMortyApi";
import type {
  Character,
  CharacterFilters,
  LocationFilters,
  EpisodeFilters,
} from "../rickAndMorty/types/api";

// Hook para manejar el estado de carga y errores
function useApiState<T>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeRequest = useCallback(async (requestFn: () => Promise<T>) => {
    console.log("🔄 Iniciando request...");
    setLoading(true);
    setError(null);

    try {
      console.log("📡 Ejecutando función de request...");
      const result = await requestFn();
      console.log("✅ Request exitoso:", result);
      setData(result);
      return result;
    } catch (err) {
      console.error("❌ Error en request:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Error desconocido";
      setError(errorMessage);
      throw err;
    } finally {
      console.log("🏁 Finalizando request...");
      setLoading(false);
    }
  }, []);

  return { data, loading, error, executeRequest };
}

// Hook para personajes
export function useCharacters(filters?: CharacterFilters) {
  console.log("🎣 useCharacters llamado con filtros:", filters);
  const { data, loading, error, executeRequest } = useApiState<any>();

  const fetchCharacters = useCallback(
    async (customFilters?: CharacterFilters) => {
      console.log(
        "🔍 fetchCharacters llamado con filtros:",
        customFilters || filters
      );
      return executeRequest(() =>
        rickAndMortyApi.characters.getAll(customFilters || filters)
      );
    },
    [executeRequest, filters]
  );

  const fetchCharacterById = useCallback(
    async (id: number) => {
      console.log("🔍 fetchCharacterById llamado con ID:", id);
      return executeRequest(() => rickAndMortyApi.characters.getById(id));
    },
    [executeRequest]
  );

  const fetchCharactersByIds = useCallback(
    async (ids: number[]) => {
      console.log("🔍 fetchCharactersByIds llamado con IDs:", ids);
      return executeRequest(() => rickAndMortyApi.characters.getByIds(ids));
    },
    [executeRequest]
  );

  // Cargar personajes automáticamente solo una vez al montar el componente
  useEffect(() => {
    console.log("⚡ useEffect ejecutado, filtros:", filters);
    if (filters) {
      console.log("🚀 Cargando personajes automáticamente...");
      // Usar executeRequest directamente para evitar el loop
      executeRequest(() => rickAndMortyApi.characters.getAll(filters));
    }
  }, [filters, executeRequest]); // Solo depende de filters y executeRequest

  console.log("📊 Estado actual:", {
    charactersCount: data?.results?.length || 0,
    loading,
    error,
    hasData: !!data,
  });

  return {
    characters: data?.results || [],
    info: data?.info,
    loading,
    error,
    fetchCharacters,
    fetchCharacterById,
    fetchCharactersByIds,
  };
}

// Hook para ubicaciones
export function useLocations(filters?: LocationFilters) {
  const { data, loading, error, executeRequest } = useApiState<any>();

  const fetchLocations = useCallback(
    async (customFilters?: LocationFilters) => {
      return executeRequest(() =>
        rickAndMortyApi.locations.getAll(customFilters || filters)
      );
    },
    [executeRequest, filters]
  );

  const fetchLocationById = useCallback(
    async (id: number) => {
      return executeRequest(() => rickAndMortyApi.locations.getById(id));
    },
    [executeRequest]
  );

  const fetchLocationsByIds = useCallback(
    async (ids: number[]) => {
      return executeRequest(() => rickAndMortyApi.locations.getByIds(ids));
    },
    [executeRequest]
  );

  useEffect(() => {
    if (filters) {
      executeRequest(() => rickAndMortyApi.locations.getAll(filters));
    }
  }, [filters, executeRequest]);

  return {
    locations: data?.results || [],
    info: data?.info,
    loading,
    error,
    fetchLocations,
    fetchLocationById,
    fetchLocationsByIds,
  };
}

// Hook para episodios
export function useEpisodes(filters?: EpisodeFilters) {
  const { data, loading, error, executeRequest } = useApiState<any>();

  const fetchEpisodes = useCallback(
    async (customFilters?: EpisodeFilters) => {
      return executeRequest(() =>
        rickAndMortyApi.episodes.getAll(customFilters || filters)
      );
    },
    [executeRequest, filters]
  );

  const fetchEpisodeById = useCallback(
    async (id: number) => {
      return executeRequest(() => rickAndMortyApi.episodes.getById(id));
    },
    [executeRequest]
  );

  const fetchEpisodesByIds = useCallback(
    async (ids: number[]) => {
      return executeRequest(() => rickAndMortyApi.episodes.getByIds(ids));
    },
    [executeRequest]
  );

  useEffect(() => {
    if (filters) {
      executeRequest(() => rickAndMortyApi.episodes.getAll(filters));
    }
  }, [filters, executeRequest]);

  return {
    episodes: data?.results || [],
    info: data?.info,
    loading,
    error,
    fetchEpisodes,
    fetchEpisodeById,
    fetchEpisodesByIds,
  };
}

// Hook para un personaje específico
export function useCharacter(id: number) {
  const { data, loading, error, executeRequest } = useApiState<Character>();

  const fetchCharacter = useCallback(async () => {
    return executeRequest(() => rickAndMortyApi.characters.getById(id));
  }, [executeRequest, id]);

  useEffect(() => {
    if (id) {
      executeRequest(() => rickAndMortyApi.characters.getById(id));
    }
  }, [id, executeRequest]);

  return {
    character: data,
    loading,
    error,
    refetch: fetchCharacter,
  };
}
