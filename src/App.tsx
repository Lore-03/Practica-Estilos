// importación de useEffect para crear el efecto de los personajes
// importación de button en la carpeta de UI button para traer el componente button
// importación de card en la carpeta de UI card para traer el componente card
// importación de AppLayout en la carpeta de AppLayout para traer el componente AppLayout
// importación de MenubarSection en la carpeta de MenubarSection para traer el componente MenubarSection
// importación de InputsSection en la carpeta de InputsSection para traer el componente InputsSection
// importación de CharactersSection en la carpeta de CharactersSection para traer el componente CharactersSection
// importación de CardsSection en la carpeta de CardsSection para traer el componente CardsSection
// importación de useCharacters para traer los personajes
import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { AppLayout } from "./components/AppLayout";
import { MenubarSection } from "./sections/MenubarSection";
import { InputsSection } from "./sections/InputsSection";
import { CharactersSection } from "./sections/CharactersSection";
import { CardsSection } from "./sections/CardsSection";
import { useCharacters as useCharactersHook } from "@/hooks/use_characters";

function App() {
  const { allCharacters, characters } = useCharactersHook();
  // useCharacters para traer los personajes
  /*   const { characters, loading, error, fetchCharacters } = useCharacters(); */
  const [page /* setPage */] = useState(1);
  // useEffect para crear el efecto de los personajes
  // Cargar personajes automáticamente al montar el componente
  useEffect(() => {
    console.log("🎬 App component montado");
    console.log("🔄 Cargando personajes automáticamente...");
    allCharacters({ page });
  }, [allCharacters, page]);

  /*   // useEffect para crear el efecto de los personajes
  useEffect(() => {
    console.log("📊 Estado de personajes actualizado:", {
      charactersCount: characters.length,
      loading,
      error,
      firstCharacter: characters[0]?.name || "Ninguno",
    });
  }, [characters, loading, error]); */

  // return para crear el App
  return (
    // AppLayout para crear el App
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2 ">
            🎨 Demostración de Estilos
          </h1>
          <p className="text-gray-600 dark:text-gray-300 ">
            Probando componentes
          </p>
        </div>
        {/* MenubarSection para crear el Menubar */}
        <MenubarSection />
        {/* Card para crear el Card */}
        <Card className="mb-8 dark:bg-gray-800 dark:border-gray-700 ">
          <CardHeader>
            <CardTitle className="dark:text-white">Botones</CardTitle>
            <CardDescription className="dark:text-gray-300">
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
        <InputsSection />
        <CharactersSection />
        <CardsSection />
      </div>
    </AppLayout>
  );
}

export default App;
