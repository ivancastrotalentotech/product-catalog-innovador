import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Search } from 'lucide-react'
import data from '../assets/data/data.json';

interface Producto {
  id: number
  nombre: string
  descripcion: string
  precio: number
  categoria: string
  imagen: string
}



const Main = () => {
  const [productoEditando, setProductoEditando] = useState<Producto | null>(null) 
  const [terminoBusqueda, setTerminoBusqueda] = useState('')
  const [productosFiltrados, setProductosFiltrados] = useState<Producto[]>([])
  const [productos, setProductos] = useState<Producto[]>(data.products)


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Lógica para agregar o actualizar producto
  }

  useEffect(() => {
     const resultadosFiltrados = productos.filter(producto =>
       producto.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
       producto.descripcion.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
       producto.categoria.toLowerCase().includes(terminoBusqueda.toLowerCase())
     )
     setProductosFiltrados(resultadosFiltrados)
   }, [terminoBusqueda, productos]) 
 
 
   const handleBusqueda = (e: React.ChangeEvent<HTMLInputElement>) => {
     setTerminoBusqueda(e.target.value)
   }
    
  return (
    <main className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Package className="mr-2" />
            {productoEditando ? 'Editar Producto' : 'Agregar Nuevo Producto'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="nombre"
              placeholder="Nombre del producto"
              defaultValue={productoEditando?.nombre || ''}
            />
            <Textarea
              name="descripcion"
              placeholder="Descripción del producto"
              defaultValue={productoEditando?.descripcion || ''}
            />
            <div className="flex space-x-4">
              <Input
                name="precio"
                type="number"
                step="0.01"
                placeholder="Precio"
                defaultValue={productoEditando?.precio || ''}
              />
              <Input
                name="categoria"
                placeholder="Categoría"
                defaultValue={productoEditando?.categoria || ''}
              />
            </div>
            <Input
              name="imagen"
              placeholder="URL de la imagen"
              defaultValue={productoEditando?.imagen || ''}
            />
            <Button type="submit" className="bg-green-500 hover:bg-green-600">
              {productoEditando ? 'Actualizar' : 'Agregar'} Producto
            </Button>
          </form>
        </div>

        {/* Componente buscador */}
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Catálogo de Productos</h2>
            <div className="relative">
            <Input
                type="search"
                placeholder="Buscar productos..."
                className="pl-10"
                value={terminoBusqueda}
                onChange={handleBusqueda}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
        </div>

        {/* <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {productosFiltrados.map((producto) => (
            <Card key={producto.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <img src={producto.imagen} alt={producto.nombre} className="w-full h-48 object-cover" />
              <CardHeader>
                <CardTitle className="text-lg">{producto.nombre}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">{producto.descripcion}</p>
                <p className="font-semibold text-lg text-blue-600">${producto.precio.toFixed(2)}</p>
                <p className="text-sm text-gray-500">Categoría: {producto.categoria}</p>
                <div className="mt-4 space-x-2">
                  <Button variant="outline" onClick={() => handleEditar(producto)}>
                    Editar
                  </Button>
                  <Button variant="destructive" onClick={() => handleEliminar(producto.id)}>
                    Eliminar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div> */}

            {/* validar   */}


        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {productos.map((producto) => (
            <Card key={producto.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <img src={producto.imagen} alt={producto.nombre} className="w-full h-48 object-cover" />
              <CardHeader>
                <CardTitle className="text-lg">{producto.nombre}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">{producto.descripcion}</p>
                <p className="font-semibold text-lg text-blue-600">${producto.precio.toFixed(2)}</p>
                <p className="text-sm text-gray-500">Categoría: {producto.categoria}</p>
                <div className="mt-4 space-x-2">
                  <Button variant="outline" onClick={() => setProductoEditando(producto)}>
                    Editar
                  </Button>
                  <Button variant="destructive" onClick={() => {}}>
                    Eliminar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>


      </main>
  )
}

export default Main