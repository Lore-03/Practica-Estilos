# 🚀 API de Rick and Morty - Documentación

Esta implementación proporciona una interfaz completa y tipada para la [API de Rick and Morty](https://rickandmortyapi.com/documentation/#get-all-characters).

## 📁 Estructura del Proyecto

```
api/resource/
├── types/
│   └── api.ts              # Tipos TypeScript para la API
├── hooks/
│   └── useRickAndMorty.ts  # Hooks de React para la API
├── rickAndMortyApi.ts      # Servicios principales de la API
├── examples.ts             # Ejemplos de uso
├── index.ts               # Exportaciones principales
└── README.md              # Esta documentación
```

## 🎯 Características

- ✅ **Tipado completo** con TypeScript
- ✅ **Hooks de React** para manejo de estado
- ✅ **Manejo de errores** robusto
- ✅ **Filtros y paginación** automática
- ✅ **Funciones utilitarias** para casos de uso comunes
- ✅ **Ejemplos prácticos** incluidos

## 🚀 Uso Básico

### Importación

```typescript
import { rickAndMortyApi, useCharacters } from '../api/resource';
```

### Obtener Personajes

```typescript
// Usando el servicio directo
const characters = await rickAndMortyApi.characters.getAll();

// Usando hooks de React
const { characters, loading, error } = useCharacters();
```

### Obtener un Personaje Específico

```typescript
const rick = await rickAndMortyApi.characters.getById(1);
```

### Filtrar Personajes

```typescript
const aliveHumans = await rickAndMortyApi.characters.getAll({
  status: 'Alive',
  species: 'Human',
  page: 1
});
```

## 🎣 Hooks de React

### useCharacters

```typescript
const { 
  characters,    // Array de personajes
  info,         // Información de paginación
  loading,      // Estado de carga
  error,        // Error si existe
  fetchCharacters,      // Función para recargar
  fetchCharacterById,   // Función para obtener por ID
  fetchCharactersByIds  // Función para obtener múltiples
} = useCharacters(filters);
```

### useLocations

```typescript
const { 
  locations, 
  info, 
  loading, 
  error,
  fetchLocations,
  fetchLocationById,
  fetchLocationsByIds
} = useLocations(filters);
```

### useEpisodes

```typescript
const { 
  episodes, 
  info, 
  loading, 
  error,
  fetchEpisodes,
  fetchEpisodeById,
  fetchEpisodesByIds
} = useEpisodes(filters);
```

### useCharacter

```typescript
const { 
  character, 
  loading, 
  error, 
  refetch 
} = useCharacter(characterId);
```

## 🔍 Filtros Disponibles

### CharacterFilters
```typescript
interface CharacterFilters {
  name?: string;           // Filtrar por nombre
  status?: 'Alive' | 'Dead' | 'unknown';
  species?: string;        // Filtrar por especie
  type?: string;          // Filtrar por tipo
  gender?: 'Female' | 'Male' | 'Genderless' | 'unknown';
  page?: number;          // Número de página
}
```

### LocationFilters
```typescript
interface LocationFilters {
  name?: string;          // Filtrar por nombre
  type?: string;          // Filtrar por tipo
  dimension?: string;     // Filtrar por dimensión
  page?: number;          // Número de página
}
```

### EpisodeFilters
```typescript
interface EpisodeFilters {
  name?: string;          // Filtrar por nombre
  episode?: string;       // Filtrar por código de episodio
  page?: number;          // Número de página
}
```

## 📊 Tipos de Datos

### Character
```typescript
interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: { name: string; url: string; };
  location: { name: string; url: string; };
  image: string;
  episode: string[];
  url: string;
  created: string;
}
```

### Location
```typescript
interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}
```

### Episode
```typescript
interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}
```

## 🛠️ Ejemplos Prácticos

### Ejemplo 1: Lista de Personajes con Filtros

```typescript
function CharactersList() {
  const [filters, setFilters] = useState<CharacterFilters>({
    status: 'Alive',
    species: 'Human'
  });

  const { characters, loading, error, info } = useCharacters(filters);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Personajes Humanos Vivos</h2>
      <p>Total: {info?.count} personajes</p>
      <ul>
        {characters.map(character => (
          <li key={character.id}>{character.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Ejemplo 2: Búsqueda de Personajes

```typescript
function CharacterSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const { characters, loading, fetchCharacters } = useCharacters();

  const handleSearch = async () => {
    await fetchCharacters({ name: searchTerm });
  };

  return (
    <div>
      <input 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar personaje..."
      />
      <button onClick={handleSearch}>Buscar</button>
      
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <ul>
          {characters.map(character => (
            <li key={character.id}>{character.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

### Ejemplo 3: Información Completa de Personaje

```typescript
function CharacterDetail({ characterId }: { characterId: number }) {
  const { character, loading, error } = useCharacter(characterId);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!character) return <div>Personaje no encontrado</div>;

  return (
    <div>
      <img src={character.image} alt={character.name} />
      <h2>{character.name}</h2>
      <p>Estado: {character.status}</p>
      <p>Especie: {character.species}</p>
      <p>Origen: {character.origin.name}</p>
      <p>Ubicación: {character.location.name}</p>
    </div>
  );
}
```

## 🔧 Funciones Utilitarias

### Búsqueda por Nombre
```typescript
const results = await searchCharactersByName('Rick');
```

### Filtrar por Especie
```typescript
const humans = await getCharactersBySpecies('Human');
```

### Filtrar por Estado
```typescript
const aliveCharacters = await getCharactersByStatus('Alive');
```

### Información Completa
```typescript
const fullInfo = await getCharacterFullInfo(1);
// Incluye personaje, origen y ubicación actual
```

### Episodios de un Personaje
```typescript
const episodes = await getCharacterEpisodes(1);
// Lista de episodios donde aparece el personaje
```

## 🚨 Manejo de Errores

La API maneja errores de forma robusta:

```typescript
try {
  const characters = await rickAndMortyApi.characters.getAll();
} catch (error) {
  console.error('Error:', error.message);
  // El error incluye el código de estado HTTP y mensaje descriptivo
}
```

## 📱 Paginación

La API soporta paginación automática:

```typescript
const { characters, info } = useCharacters({ page: 1 });

// info contiene:
// - count: total de elementos
// - pages: total de páginas
// - next: URL de la siguiente página
// - prev: URL de la página anterior
```

## 🎨 Integración con shadcn/ui

La API se integra perfectamente con los componentes de shadcn/ui:

```typescript
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCharacters } from '../api/resource';

function CharactersGrid() {
  const { characters, loading } = useCharacters();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {characters.map(character => (
        <Card key={character.id}>
          <CardHeader>
            <CardTitle>{character.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <img src={character.image} alt={character.name} />
            <p>{character.species}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
```

## 🔗 Enlaces Útiles

- [Documentación Oficial de la API](https://rickandmortyapi.com/documentation/)
- [Base URL de la API](https://rickandmortyapi.com/api)
- [GraphQL Endpoint](https://rickandmortyapi.com/graphql)

## 📝 Notas

- La API es gratuita y no requiere autenticación
- Los límites de rate están definidos por el servidor
- Todas las imágenes son de 300x300px
- La paginación es de 20 elementos por página
- Los datos se actualizan regularmente con nuevos episodios
