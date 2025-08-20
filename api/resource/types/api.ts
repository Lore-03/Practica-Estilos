// Tipos base para la API de Rick and Morty
export interface ApiResponse<T> {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: T[];
}

// Tipos para Character
export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

// Tipos para Location
export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

// Tipos para Episode
export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

// Parámetros de filtrado para Characters
export interface CharacterFilters {
  name?: string;
  status?: 'Alive' | 'Dead' | 'unknown';
  species?: string;
  type?: string;
  gender?: 'Female' | 'Male' | 'Genderless' | 'unknown';
  page?: number;
}

// Parámetros de filtrado para Locations
export interface LocationFilters {
  name?: string;
  type?: string;
  dimension?: string;
  page?: number;
}

// Parámetros de filtrado para Episodes
export interface EpisodeFilters {
  name?: string;
  episode?: string;
  page?: number;
}
