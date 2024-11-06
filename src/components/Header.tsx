import { ShoppingCart } from 'lucide-react'

const Header = () => {

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="h-8 w-8" />
            <h1 className="text-2xl font-bold">MegaShop</h1>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="hover:text-blue-200">Inicio</a></li>
              <li><a href="#" className="hover:text-blue-200">Categorías</a></li>
              <li><a href="#" className="hover:text-blue-200">Ofertas</a></li>
              <li><a href="#" className="hover:text-blue-200">Contacto</a></li>
            </ul>
          </nav>
        </div>
      </header>
  )
}

export default Header

