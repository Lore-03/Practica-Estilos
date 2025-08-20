import { useState, useEffect } from 'react'
import { Button } from './components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card'
import { Input } from './components/ui/input'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './components/ui/carousel'
import { useCharacters } from '../api/resource'
import type { Character } from '../api/resource'
import { ApiTest } from './ApiTest'

function App() {
  const [inputValue, setInputValue] = useState('')
  
  // Usar el hook SIN filtros iniciales para evitar el loop
  const { characters, loading, error, fetchCharacters } = useCharacters();

  // Logs para depuración
  useEffect(() => {
    console.log('🎬 App component montado');
  }, []);

  useEffect(() => {
    console.log('📊 Estado de personajes actualizado:', {
      charactersCount: characters.length,
      loading,
      error,
      firstCharacter: characters[0]?.name || 'Ninguno'
    });
  }, [characters, loading, error]);

  console.log('🎨 App renderizando con:', {
    charactersCount: characters.length,
    loading,
    error: error || 'Sin error'
  });

  // Función para cargar personajes manualmente
  const handleLoadCharacters = async () => {
    console.log('🔄 Cargando personajes manualmente...');
    await fetchCharacters({ page: 1 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🎨 Demostración de Estilos
          </h1>
          <p className="text-gray-600">
            Probando componentes de shadcn/ui con diferentes variantes y estilos
          </p>
        </div>

        {/* Prueba de API */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Prueba de API</CardTitle>
            <CardDescription>
              Componente para diagnosticar problemas con la API
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ApiTest />
          </CardContent>
        </Card>

        {/* Botón para cargar personajes */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Cargar Personajes</CardTitle>
            <CardDescription>
              Haz clic para cargar los personajes de Rick and Morty
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={handleLoadCharacters}
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Cargando...' : 'Cargar Personajes'}
            </Button>
          </CardContent>
        </Card>

        {/* Botones */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Botones</CardTitle>
            <CardDescription>
              Diferentes variantes y tamaños de botones
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </CardContent>
        </Card>

        {/* Inputs */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Campos de Entrada</CardTitle>
            <CardDescription>
              Diferentes tipos de inputs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Input normal</label>
                <Input 
                  placeholder="Escribe algo aquí..." 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Input con valor</label>
                <Input 
                  placeholder="Campo deshabilitado" 
                  disabled 
                  value="Valor fijo"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Carousel con personajes de Rick and Morty */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Personajes de Rick and Morty</CardTitle>
            <CardDescription>
              Carrusel con personajes reales de la API
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-600">Cargando personajes...</p>
                <p className="text-sm text-gray-500 mt-2">Estado: {loading ? 'Cargando' : 'Completado'}</p>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-600">Error: {error}</p>
                <p className="text-sm text-gray-500 mt-2">Revisa la consola para más detalles</p>
              </div>
            ) : characters.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">No se encontraron personajes</p>
                <p className="text-sm text-gray-500 mt-2">Personajes cargados: {characters.length}</p>
                <p className="text-sm text-gray-500">Haz clic en "Cargar Personajes" para comenzar</p>
              </div>
            ) : (
              <Carousel className="w-full max-w-2xl mx-auto">
                <CarouselContent>
                  {characters.slice(0, 10).map((character: Character) => (
                    <CarouselItem key={character.id}>
                      <div className="p-1">
                        <Card className="border-0 shadow-lg overflow-hidden">
                          <CardContent className="p-0">
                            <div className="relative">
                              <img 
                                src={character.image} 
                                alt={character.name}
                                className="w-full h-48 object-cover"
                              />
                              <div className="absolute top-2 right-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  character.status === 'Alive' ? 'bg-green-500 text-white' :
                                  character.status === 'Dead' ? 'bg-red-500 text-white' :
                                  'bg-gray-500 text-white'
                                }`}>
                                  {character.status}
                                </span>
                              </div>
                            </div>
                            <div className="p-4">
                              <h3 className="text-lg font-bold mb-1">{character.name}</h3>
                              <p className="text-sm text-gray-600 mb-2">{character.species}</p>
                              <p className="text-xs text-gray-500">
                                <strong>Origen:</strong> {character.origin.name}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            )}
          </CardContent>
        </Card>

        {/* Cards de ejemplo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Card 1</CardTitle>
              <CardDescription>Descripción del primer card</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Este es el contenido del primer card. Aquí puedes poner cualquier información.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Acción</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Card 2</CardTitle>
              <CardDescription>Descripción del segundo card</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Este es el contenido del segundo card. Cada card puede tener contenido diferente.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Acción Secundaria</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Card 3</CardTitle>
              <CardDescription>Descripción del tercer card</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Este es el contenido del tercer card. Los cards son muy versátiles.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="destructive" className="w-full">Eliminar</Button>
            </CardFooter>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pt-8 border-t border-gray-200">
          <p className="text-gray-500">
            ✨ Creado con React + Vite + shadcn/ui + Rick and Morty API
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
