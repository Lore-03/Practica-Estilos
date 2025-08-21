// importación de boton en la carpeta de UI button para traer el componente button
import { Button } from "@/components/ui/button"
// importación de card en la carpeta de UI card para traer el componente card
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// función para crear las cards
export function CardsSection() {
  return (
    // grid para crear las cards
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 ">
      <Card className="dark:bg-gray-800 dark:border-gray-700 ">
        <CardHeader>
          <CardTitle className="dark:text-white">Card 1</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 dark:text-gray-300">Funciona.</p>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Acción</Button>
        </CardFooter>
      </Card>

      <Card className="dark:bg-gray-800 dark:border-gray-700 ">
        <CardHeader>
          <CardTitle className="dark:text-white">Card 2</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 dark:text-gray-300">Funciona la segunda card.</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">Acción Secundaria</Button>
        </CardFooter>
      </Card>

      <Card className="dark:bg-gray-800 dark:border-gray-700 ">
        <CardHeader>
          <CardTitle className="dark:text-white">Card 3</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 dark:text-gray-300">Funciona la tercera card.</p>
        </CardContent>
        <CardFooter>
          <Button variant="destructive" className="w-full">Eliminar</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default CardsSection


