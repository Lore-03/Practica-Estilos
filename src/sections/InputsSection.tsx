// importación de card en la carpeta de UI card para traer el componente card
// importación de input en la carpeta de UI input para traer el componente input
// importación de useState para crear el estado de los inputs
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react"

// función para crear los inputs
export function InputsSection() {
  // useState para crear el estado de los inputs
  const [inputValue, setInputValue] = useState("")
  // return para crear los inputs
  return (
    <Card className="mb-8 dark:bg-gray-800 dark:border-gray-700 ">
      <CardHeader>
        <CardTitle className="dark:text-white">Campos de Entrada</CardTitle>
        <CardDescription className="dark:text-gray-300">
          Diferentes tipos de inputs
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block dark:text-gray-200">Input normal</label>
            <Input
              placeholder="Escribe algo aquí..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block dark:text-gray-200">Input con valor</label>
            <Input
              placeholder="Campo deshabilitado"
              disabled
              value="Valor fijo"
              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default InputsSection


