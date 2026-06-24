import { NavLink } from "react-router-dom";
import bookworm from "../assets/bookworm.png";
import "bootstrap-icons/font/bootstrap-icons.min.css";
//import { useState } from "react";
//import useLivroStore from "../store/LivroStore";
//import type { Livro } from "../interfaces/Livro";

const NavBar = () => {
  // const [isOpen, setIsOpen] = useState(false); // Descomente se for usar um menu mobile
  // const setLivroSelecionado = useLivroStore((s) => s.setLivroSelecionado);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
            <NavLink to="/home" className="flex items-center space-x-1 cursor-pointer transition-transform hover:scale-105">
              <img src={bookworm} alt="Bookworm Logo" className="w-20 h-20 object-contain" />
              <span className="text-2xl font-bold text-slate-800 tracking-tight">
                Book<span className="text-indigo-600">worm</span>
              </span>
            </NavLink>
        
          <div className="hidden md:flex space-x-8">
            <NavLink 
              to="/more-searched" 
              className={({ isActive }) => `font-medium transition-colors ${isActive ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'}`}
            >
              Mais Buscados
            </NavLink>
            <NavLink 
              to="/search" 
              className={({ isActive }) => `font-medium transition-colors ${isActive ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'}`}
            >
              Pesquisar
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;