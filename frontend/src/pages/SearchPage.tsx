import Pesquisa from "../components/Pesquisa";
import LivroSearchCard from "../components/LivroCardSearch";
import useLivroStore from "../store/LivroStore";
import useRecuperarLivroPorTitulo from "../hooks/useRecuperarLivrosPorTitulo";
import { useSearchParams } from "react-router-dom";
import { useState, type Key } from "react";
import type { Livro } from "../interfaces/Livro";
import { isUndefined } from "lodash";

const SearchPage = () => {
  // Puxa o termo buscado na store
  const termoBuscado = useLivroStore((s) => s.nome);
  const [searchParams] = useSearchParams();
  const [ordem, setOrdem] = useState<"menor" | "maior">("menor");
  //Pega o "q" da URL
  const livro = searchParams.get("q") || "";
  // const resultadosMock = [
  //   {
  //     titulo: "O Senhor dos Anéis", autor: "J.R.R. Tolkien", loja: "Amazon", preco: 120.50, link: "#", melhor: true, imagem: "https://via.placeholder.com/150"
  //   },
  //   {
  //     titulo: "O Senhor dos Anéis", autor: "J.R.R. Tolkien", loja: "Submarino", preco: 145.00, link: "#", melhor: false, imagem: "https://via.placeholder.com/150"
  //   }
  // ];

  const ordenarLivros = (lista: Livro[]) => {
    if (!lista) return [];
    return lista.toSorted((a, b) => {
      return ordem === "menor" ? a.preco - b.preco : b.preco - a.preco;
    });
  };

  const {
    data: livros,
    isPending: recuperandoProduto,
    error: errorRecuperarProduto,
  } = useRecuperarLivroPorTitulo(livro!);

  //console.log(livros);

  if (errorRecuperarProduto) throw errorRecuperarProduto;

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">
            Encontre o <span className="text-indigo-600">melhor preço</span>{" "}
            para a sua próxima leitura.
          </h1>
        </div>

        <Pesquisa />

        {termoBuscado && (
            <div className="mt-8 mb-4 border-b border-gray-200 pb-4">
              <h2 className="text-xl font-semibold text-black">
                Resultados para:{" "}
                <span className="text-purple-600">"{termoBuscado}"</span>
              </h2>

              <div className="mt-5 flex items-center gap-3">
                <label className="text-sm font-medium text-gray-700">
                  Ordenar por:
                </label>
                <div className="relative">
                  <select
                    value={ordem}
                    onChange={(e) => setOrdem(e.target.value as "menor" | "maior")}
                    className="appearance-none rounded-full border-2 border-purple-200 bg-white px-5 py-2 pr-10 text-sm font-semibold text-black shadow-sm hover:border-purple-400 focus:border-purple-600 focus:outline-none focus:ring-4 focus:ring-purple-100 cursor-pointer"
                  >
                    <option value="menor">Menor Preço</option>
                    <option value="maior">Maior Preço</option>
                  </select>
                </div>
              </div>
            </div>
        )}

        {!recuperandoProduto && (
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ordenarLivros(livros).map(
              (livro: Livro, index: Key | null | undefined) => (
                <LivroSearchCard key={index} livro={livro} />
              ),
            )}
          </div>
        )}
        {recuperandoProduto && !isUndefined(livro) && termoBuscado!="" && (
          <div className="flex items-center justify-center py-10">
            <h2 className="text-3xl font-bold text-indigo-600">
              <span className="ml-1 inline-flex">
                <span className="animate-bounce [animation-delay:0ms]">.</span>
                <span className="animate-bounce [animation-delay:150ms]">.</span>
                <span className="animate-bounce [animation-delay:300ms]">.</span>
              </span>
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};
export default SearchPage;
