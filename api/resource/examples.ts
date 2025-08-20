// Ejemplos de uso de la API de Rick and Morty
import { rickAndMortyApi, useCharacters, useLocations, useEpisodes } from './index';

// ===== EJEMPLOS DE USO DIRECTO DE LA API =====

// 1. Obtener todos los personajes
export async function getAllCharactersExample() {
  try {
    const response = await rickAndMortyApi.characters.getAll();
    console.log('Personajes:', response.results);
    console.log('Información de paginación:', response.info);
    return response;
  } catch (error) {
    console.error('Error al obtener personajes:', error);
  }
}

// 2. Obtener personajes con filtros
export async function getFilteredCharactersExample() {
  try {
    const response = await rickAndMortyApi.characters.getAll({
      status: 'Alive',
      species: 'Human',
      page: 1
    });
    console.log('Personajes humanos vivos:', response.results);
    return response;
  } catch (error) {
    console.error('Error al obtener personajes filtrados:', error);
  }
}

// 3. Obtener un personaje específico
export async function getCharacterByIdExample() {
  try {
    const character = await rickAndMortyApi.characters.getById(1);
    console.log('Rick Sanchez:', character);
    return character;
  } catch (error) {
    console.error('Error al obtener personaje:', error);
  }
}

// 4. Obtener múltiples personajes
export async function getMultipleCharactersExample() {
  try {
    const characters = await rickAndMortyApi.characters.getByIds([1, 2, 3]);
    console.log('Múltiples personajes:', characters);
    return characters;
  } catch (error) {
    console.error('Error al obtener múltiples personajes:', error);
  }
}

// 5. Obtener ubicaciones
export async function getLocationsExample() {
  try {
    const response = await rickAndMortyApi.locations.getAll({ page: 1 });
    console.log('Ubicaciones:', response.results);
    return response;
  } catch (error) {
    console.error('Error al obtener ubicaciones:', error);
  }
}

// 6. Obtener episodios
export async function getEpisodesExample() {
  try {
    const response = await rickAndMortyApi.episodes.getAll({ page: 1 });
    console.log('Episodios:', response.results);
    return response;
  } catch (error) {
    console.error('Error al obtener episodios:', error);
  }
}

// ===== EJEMPLOS DE USO CON HOOKS DE REACT =====

// 7. Hook para personajes con filtros
export function CharactersWithFiltersExample() {
  const { characters, loading, error, info } = useCharacters({
    status: 'Alive',
    species: 'Human',
    page: 1
  });

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Personajes Humanos Vivos</h2>
      <p>Total: {info?.count || 0} personajes</p>
      <p>Páginas: {info?.pages || 0}</p>
      <ul>
        {characters.map(character => (
          <li key={character.id}>{character.name}</li>
        ))}
      </ul>
    </div>
  );
}

// 8. Hook para ubicaciones
export function LocationsExample() {
  const { locations, loading, error } = useLocations({ page: 1 });

  if (loading) return <div>Cargando ubicaciones...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Ubicaciones</h2>
      <ul>
        {locations.map(location => (
          <li key={location.id}>
            {location.name} - {location.type} ({location.dimension})
          </li>
        ))}
      </ul>
    </div>
  );
}

// 9. Hook para episodios
export function EpisodesExample() {
  const { episodes, loading, error } = useEpisodes({ page: 1 });

  if (loading) return <div>Cargando episodios...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Episodios</h2>
      <ul>
        {episodes.map(episode => (
          <li key={episode.id}>
            {episode.episode}: {episode.name} ({episode.air_date})
          </li>
        ))}
      </ul>
    </div>
  );
}

// ===== EJEMPLOS DE FUNCIONES UTILITARIAS =====

// 10. Función para buscar personajes por nombre
export async function searchCharactersByName(name: string) {
  try {
    const response = await rickAndMortyApi.characters.getAll({ name });
    return response.results;
  } catch (error) {
    console.error('Error en búsqueda:', error);
    return [];
  }
}

// 11. Función para obtener personajes por especie
export async function getCharactersBySpecies(species: string) {
  try {
    const response = await rickAndMortyApi.characters.getAll({ species });
    return response.results;
  } catch (error) {
    console.error('Error al obtener por especie:', error);
    return [];
  }
}

// 12. Función para obtener personajes por estado
export async function getCharactersByStatus(status: 'Alive' | 'Dead' | 'unknown') {
  try {
    const response = await rickAndMortyApi.characters.getAll({ status });
    return response.results;
  } catch (error) {
    console.error('Error al obtener por estado:', error);
    return [];
  }
}

// ===== EJEMPLOS DE USO AVANZADO =====

// 13. Función para obtener información completa de un personaje
export async function getCharacterFullInfo(characterId: number) {
  try {
    const character = await rickAndMortyApi.characters.getById(characterId);
    
    // Obtener información de la ubicación de origen
    const originId = character.origin.url.split('/').pop();
    const origin = originId ? await rickAndMortyApi.locations.getById(parseInt(originId)) : null;
    
    // Obtener información de la ubicación actual
    const locationId = character.location.url.split('/').pop();
    const location = locationId ? await rickAndMortyApi.locations.getById(parseInt(locationId)) : null;
    
    return {
      character,
      origin,
      location
    };
  } catch (error) {
    console.error('Error al obtener información completa:', error);
    return null;
  }
}

// 14. Función para obtener episodios de un personaje
export async function getCharacterEpisodes(characterId: number) {
  try {
    const character = await rickAndMortyApi.characters.getById(characterId);
    
    // Extraer IDs de episodios de las URLs
    const episodeIds = character.episode.map(url => 
      parseInt(url.split('/').pop() || '0')
    ).filter(id => id > 0);
    
    // Obtener información de los episodios
    const episodes = await rickAndMortyApi.episodes.getByIds(episodeIds);
    
    return episodes;
  } catch (error) {
    console.error('Error al obtener episodios del personaje:', error);
    return [];
  }
}
