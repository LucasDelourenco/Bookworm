import Pesquisa from "../components/Pesquisa";
import LivroSeachCard from "../components/LivroCardSearch";
import useLivroStore from "../store/LivroStore";

const SearchPage = () => {
  // Puxa o termo buscado na store
  const termoBuscado = useLivroStore((s) => s.nome); 

  const resultadosMock = [
    {
      titulo: "O Senhor dos Anéis", autor: "J.R.R. Tolkien", loja: "Amazon", preco: 120.50, link: "#", isBetter: true, imagemUrl: "https://via.placeholder.com/150"
    },
    {
      titulo: "O Senhor dos Anéis", autor: "J.R.R. Tolkien", loja: "Submarino", preco: 145.00, link: "#", isBetter: false, imagemUrl: "https://via.placeholder.com/150"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">
            Encontre o <span className="text-indigo-600">melhor preço</span> para a sua próxima leitura.
          </h1>
        </div>

        <Pesquisa />

        {termoBuscado && (
          <div className="mt-8 mb-4 border-b border-gray-200 pb-2">
            <h2 className="text-xl font-semibold text-slate-800">
              Resultados para: <span className="text-indigo-600">"{termoBuscado}"</span>
            </h2>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {resultadosMock.map((livro, index) => (
            <LivroSeachCard key={index} livro={livro} />
          ))}
        </div>

      </div>
    </div>
  );
};
export default SearchPage;