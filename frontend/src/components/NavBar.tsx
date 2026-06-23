import { NavLink } from "react-router-dom";
import bookworm from "../assets/bookworm.png";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import { useState } from "react";
import useLivroStore from "../store/LivroStore";
import type { Livro } from "../interfaces/Livro";

// Modos do Tailwindcss:
// sm: 640px
// md: 768px
// lg: 1024px
// xl: 1280px
// 2xl: 1536px

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const setLivroSelecionado = useLivroStore((s) => s.setLivroSelecionado);

  return (
    <nav className="mb-6 bg-gray-100 py-4">
      <div className="mx-3 md:mx-10 lg:mx-20">
        <div className="flex justify-between">
          <div className="flex items-center space-x-4">
            
            <img src={bookworm} width="45px" />
            <h1 className="">Bookworm</h1>
            
          </div>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;