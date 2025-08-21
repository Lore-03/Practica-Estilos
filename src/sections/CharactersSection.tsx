// importación de useEffect para crear el efecto de los personajes
// importación de card en la carpeta de UI card para traer el componente card
// importación de carousel en la carpeta de UI carousel para traer el componente carousel
// importación de useCharacters para traer los personajes
// importación de type Character para traer el tipo de personaje

import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { useCharacters } from "../../api/resource"
import type { Character } from "../../api/resource"

// función para crear los personajes
export function CharactersSection() {
  // useCharacters para traer los personajes
  const { characters, loading, error, fetchCharacters } = useCharacters()

  // useEffect para crear el efecto de los personajes
  useEffect(() => {
    fetchCharacters({ page: 1 })
  }, [fetchCharacters])

  return (
    <Card className="mb-8 dark:bg-gray-800 dark:border-gray-700 ">
      <CardHeader>
        <CardTitle className="dark:text-white">Personajes de Rick and Morty</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-300">Cargando personajes...</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Estado: {loading ? "Cargando" : "Completado"}</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-600 dark:text-red-400">Error: {error}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Revisa la consola para más detalles</p>
          </div>
        ) : characters.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-300">No se encontraron personajes</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Personajes cargados: {characters.length}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Los personajes se cargan automáticamente</p>
          </div>
        ) : (
          <Carousel className="w-full max-w-4xl ">
            <CarouselContent className="-ml-2 md:-ml-4">
              {characters.slice(0, 10).map((character: Character) => (
                <CarouselItem key={character.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="border-0 overflow-hidden bg-white dark:bg-gray-700 ">
                      <CardContent className="p-0">
                        <div className="relative">
                          <img
                            src={character.image}
                            alt={character.name}
                            className="w-full h-64 object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-600 dark:to-gray-700 ">
                          <h3 className="text-lg font-bold mb-1 text-gray-800 dark:text-white">{character.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{character.species}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            <strong>Origen:</strong> {character.origin.name}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 bg-white/80 hover:bg-white dark:bg-gray-700/80 dark:hover:bg-gray-700 border-0 " />
            <CarouselNext className="right-2 bg-white/80 hover:bg-white dark:bg-gray-700/80 dark:hover:bg-gray-700 border-0 " />
          </Carousel>
        )}
      </CardContent>
    </Card>
  )
}

export default CharactersSection


