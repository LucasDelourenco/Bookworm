import _ from "lodash";
//import { useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLivroStore from "../store/LivroStore";

const Pesquisa = () => {
  const setNome = useLivroStore((s) => s.setNome);
  const navigate = useNavigate();

  const tratarPesquisa = (nome: string) => {
    setNome(nome);
    if (nome.trim() === "") navigate("/search");
    else navigate("/search?q=" + encodeURIComponent(nome));
  };

  // const debouncedFunction = _.debounce((nome: string) => {
  //   tratarPesquisa(nome);
  // }, 1500);

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   debouncedFunction(event.target.value);
  //   event.preventDefault();
  // };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      tratarPesquisa(event.currentTarget.value); // Isso garante que a função debounced seja executada imediatamente ao aperta enter
      // event.preventDefault();
      // navigate("/search");
    }
  };

  return (
    <div className="my-8 flex w-full justify-center">
      <div className="group relative w-full max-w-2xl">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4">
          {/* o group-focus-within quando o usuário clica no input (que está dentro do elemento group), a cor da lupa muda para um tom de roxo/índigo.  */}
          <i className="bi bi-search text-gray-400 group-focus-within:text-indigo-500"></i>
        </div>
        <input
          //onChange={handleChange}
          onKeyDown={handleKeyDown}
          type="text"
          className="w-full rounded-full border border-gray-200 bg-white py-4 pr-4 pl-12 text-lg text-gray-800 placeholder-gray-400 shadow-sm transition-all focus:border-transparent focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          placeholder="Qual livro você está procurando hoje?"
        />
      </div>
    </div>
  );
};

export default Pesquisa;
