import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Search } from 'lucide-react'
import clienteAxios from '../config/axios';

// import data from '../assets/data/data.json';

interface Producto {
  id: number
  nombre: string
  descripcion: string
  precio: number
  categoria: string
  imagen: string
}



const Main = () => {
  const [productos, setProductos] = useState<Producto[]>([])
  const [productoEditando, setProductoEditando] = useState<Producto | null>(null) 
  const [terminoBusqueda, setTerminoBusqueda] = useState('')
  const [productosFiltrados, setProductosFiltrados] = useState<Producto[]>([])


  const consultarApi = async () =>{
    try {
      const { data } = await  clienteAxios.get(`producto`);
      console.log(data)
      setProductos(data.data); 
    } catch (error) {
      console.error('Error:', error);
      setProductos([]);
    }
  };

  //  aqui vamos a consultar la base de datos de productos cada vez que el component cargue (Main - useEffect) 
  useEffect(() => {
      // ejecutara una accion 
      consultarApi(); 
  }, []) 


  useEffect(() => {
     const resultadosFiltrados = productos.filter(producto =>
       producto.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
       producto.descripcion.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
       producto.categoria.toLowerCase().includes(terminoBusqueda.toLowerCase())
     )
     setProductosFiltrados(resultadosFiltrados)
   }, [terminoBusqueda, productos]) 
 
   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const nuevoProducto = {
      id: productoEditando ? productoEditando.id : Date.now(),
      nombre: formData.get('nombre') as string,
      descripcion: formData.get('descripcion') as string,
      precio: parseFloat(formData.get('precio') as string),
      categoria: formData.get('categoria') as string,
      imagen: formData.get('imagen') as string,
    }

    if (productoEditando) {
      setProductos(productos.map(p => p.id === productoEditando.id ? nuevoProducto : p))
    } else {
      setProductos([...productos, nuevoProducto])
    }

    setProductoEditando(null)
    form.reset()
  }

  const handleEditar  = async (producto: Producto) => {

    try {
      const {  id } = producto;
      const { data } = await  clienteAxios.patch(`producto/${id}`);
      console.log("handleEditar: ", data)      
      setProductoEditando(producto)
    } catch (error) {
      console.error('Error:', error);
      setProductoEditando(producto)
    }

    setProductoEditando(producto)
  }

  const handleEliminar = (id: number) => {
    setProductos(productos.filter(p => p.id !== id))
  }

  const handleBusqueda = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerminoBusqueda(e.target.value)
  }


  console.log(productos)


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
            required
          />
          <Textarea
            name="descripcion"
            placeholder="Descripción del producto"
            defaultValue={productoEditando?.descripcion || ''}
            required
          />
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Input
              name="precio"
              type="number"
              step="0.01"
              placeholder="Precio"
              defaultValue={productoEditando?.precio || ''}
              required
            />
            <Input
              name="categoria"
              placeholder="Categoría"
              defaultValue={productoEditando?.categoria || ''}
              required
            />
          </div>
          <Input
            name="imagen"
            placeholder="URL de la imagen"
            defaultValue={productoEditando?.imagen || ''}
            required
          />
          <Button type="submit" className="w-full sm:w-auto bg-green-500 hover:bg-green-600">
            {productoEditando ? 'Actualizar' : 'Agregar'} Producto
          </Button>
        </form>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold mb-4 sm:mb-0">Catálogo de Productos</h2>
        <div className="relative w-full sm:w-auto">
          <Input
            type="search"
            placeholder="Buscar productos..."
            className="pl-10 w-full"
            value={terminoBusqueda}
            onChange={handleBusqueda}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {productosFiltrados.map((producto) => (
          <Card key={producto.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img src={producto.imagen} alt={producto.nombre} className="w-full h-48 object-cover" />
            <CardHeader>
              <CardTitle className="text-lg">{producto.nombre}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">{producto.descripcion}</p>
              <p className="font-semibold text-lg text-blue-600">${+producto.precio}</p>
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
      </div>
    </main>
  )
}

export default Main