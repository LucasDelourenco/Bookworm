import { useNavigate } from "react-router-dom";
import useRecuperarMaisBuscados from "../hooks/useRecuperarMaisBuscados";
import useLivroStore from "../store/LivroStore";

const MoreSearchPage = () => {
  const { data: livrosPopulares, isPending, error } = useRecuperarMaisBuscados();
  const navigate = useNavigate();
  const setNome = useLivroStore((s) => s.setNome);

  if (error) {
    return <div className="mt-10 text-center text-red-500">Erro ao carregar o ranking.</div>;
  }

  // Joga pra pesquisa com o livro escolhido
  const handleSearch = (titulo: string) => {
    setNome(titulo)
    navigate(`/search?q=${encodeURIComponent(titulo)}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Livros <span className="text-indigo-600">Mais Buscados</span>
          </h1>
          <p className="mt-2 text-gray-500">
            Confira as leituras que estão em alta no momento e busque os melhores preços.
          </p>
        </div>

        {isPending ? (
          <div className="flex items-center justify-center py-10">
            <h2 className="text-3xl font-bold text-indigo-600">
              Carregando o Top 10
              <span className="ml-1 inline-flex"> {/* <-- Wrapper necessário aqui! */}
                <span className="animate-bounce [animation-delay:0ms]">.</span>
                <span className="animate-bounce [animation-delay:150ms]">.</span>
                <span className="animate-bounce [animation-delay:300ms]">.</span>
              </span>
            </h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Pra não dar erro de tipagem. Passa para string */}
            {livrosPopulares?.map((tituloLivro: string, index: number) => (
              <div 
                key={index} 
                className="flex flex-col justify-between rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                 <div className="flex items-start gap-4">
                    <span className="text-3xl font-black text-indigo-200">#{index + 1}</span>
                    <h3 className="text-lg font-bold text-gray-800">{tituloLivro}</h3>
                 </div>
                 
                 <button 
                    onClick={() => handleSearch(tituloLivro)}
                    className="mt-6 w-full rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-indigo-700"
                 >
                    Buscar Preços
                 </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default MoreSearchPage;