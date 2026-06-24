import _ from "lodash";
//import { useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLivroStore from "../store/LivroStore";

const Pesquisa = () => {
  const setNome = useLivroStore((s) => s.setNome);
  const navigate = useNavigate();
  
  const tratarPesquisa = (nome: string) => {
    setNome(nome);
  };

  const debouncedFunction = _.debounce((nome: string) => {
    tratarPesquisa(nome);
  }, 1000);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedFunction(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      debouncedFunction.flush(); // Isso garante que a função debounced seja executada imediatamente ao aperta enter
      event.preventDefault();
      navigate("/search");
    }
  }

  return (
    <div className="flex justify-center w-full my-8">
      <div className="relative w-full max-w-2xl group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
          {/* o group-focus-within quando o usuário clica no input (que está dentro do elemento group), a cor da lupa muda para um tom de roxo/índigo.  */}
          <i className="bi bi-search text-gray-400 group-focus-within:text-indigo-500"></i>
        </div>
        <input
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          type="text"
          className="w-full pl-12 pr-4 py-4 text-lg bg-white border border-gray-200 rounded-full shadow-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          placeholder="Qual livro você está procurando hoje?"
        />
      </div>
    </div>
  );
};

export default Pesquisa;