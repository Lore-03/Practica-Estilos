import type {
  ApiResponse,
  Character,
  Location,
  Episode,
  CharacterFilters,
  LocationFilters,
  EpisodeFilters,
} from "./rickAndMorty/types/api";

const BASE_URL = "https://rickandmortyapi.com/api";

// Función helper para construir URLs con parámetros
function buildUrl(endpoint: string, params?: Record<string, any>): string {
  const url = new URL(`${BASE_URL}${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.append(key, value.toString());
      }
    });
  }

  console.log("🌐 URL construida:", url.toString());
  return url.toString();
}

// Función helper para manejar errores de la API
async function handleApiResponse<T>(response: Response): Promise<T> {
  console.log("📡 Response status:", response.status, response.statusText);

  if (!response.ok) {
    console.error("❌ Error HTTP:", response.status, response.statusText);
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  console.log("📦 Datos recibidos:", data);
  return data;
}

// ===== CHARACTERS =====
export const charactersApi = {
  // Obtener todos los personajes con filtros opcionales
  getAll: async (
    filters?: CharacterFilters
  ): Promise<ApiResponse<Character>> => {
    console.log("👥 getAll characters llamado con filtros:", filters);
    const url = buildUrl("/character", filters);
    console.log("🚀 Haciendo fetch a:", url);

    const response = await fetch(url);
    return handleApiResponse<ApiResponse<Character>>(response);
  },

  // Obtener un personaje específico por ID
  getById: async (id: number): Promise<Character> => {
    console.log("👤 getById character llamado con ID:", id);
    const url = buildUrl(`/character/${id}`);
    console.log("🚀 Haciendo fetch a:", url);

    const response = await fetch(url);
    return handleApiResponse<Character>(response);
  },

  // Obtener múltiples personajes por IDs
  getByIds: async (ids: number[]): Promise<Character[]> => {
    console.log("👥👥 getByIds characters llamado con IDs:", ids);
    const url = buildUrl(`/character/${ids.join(",")}`);
    console.log("🚀 Haciendo fetch a:", url);

    const response = await fetch(url);
    return handleApiResponse<Character[]>(response);
  },
};

// ===== LOCATIONS =====
export const locationsApi = {
  // Obtener todas las ubicaciones con filtros opcionales
  getAll: async (filters?: LocationFilters): Promise<ApiResponse<Location>> => {
    const url = buildUrl("/location", filters);
    const response = await fetch(url);
    return handleApiResponse<ApiResponse<Location>>(response);
  },

  // Obtener una ubicación específica por ID
  getById: async (id: number): Promise<Location> => {
    const url = buildUrl(`/location/${id}`);
    const response = await fetch(url);
    return handleApiResponse<Location>(response);
  },

  // Obtener múltiples ubicaciones por IDs
  getByIds: async (ids: number[]): Promise<Location[]> => {
    const url = buildUrl(`/location/${ids.join(",")}`);
    const response = await fetch(url);
    return handleApiResponse<Location[]>(response);
  },
};

// ===== EPISODES =====
export const episodesApi = {
  // Obtener todos los episodios con filtros opcionales
  getAll: async (filters?: EpisodeFilters): Promise<ApiResponse<Episode>> => {
    const url = buildUrl("/episode", filters);
    const response = await fetch(url);
    return handleApiResponse<ApiResponse<Episode>>(response);
  },

  // Obtener un episodio específico por ID
  getById: async (id: number): Promise<Episode> => {
    const url = buildUrl(`/episode/${id}`);
    const response = await fetch(url);
    return handleApiResponse<Episode>(response);
  },

  // Obtener múltiples episodios por IDs
  getByIds: async (ids: number[]): Promise<Episode[]> => {
    const url = buildUrl(`/episode/${ids.join(",")}`);
    const response = await fetch(url);
    return handleApiResponse<Episode[]>(response);
  },
};

// Exportar todo como un objeto principal
export const rickAndMortyApi = {
  characters: charactersApi,
  locations: locationsApi,
  episodes: episodesApi,
};
