// src/components/LivroCard.tsx
import type { Livro } from '../interfaces/Livro';


// interface LivroCardProps {
//   titulo?: string;
//   autor?: string;
//   imagem?: string;
//   loja: string;
//   preco: number;
//   link: string;
//   melhor: boolean;
// }

// export interface LivroMock {
//     livro: LivroCardProps;
// }

interface Props {
  livro: Livro;
}

const LivroSeachCard = ( {livro}: Props ) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:scale-101 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
        {livro.melhor && (
            <div className="self-start top-5 right-3 bg-indigo-600 text-white text-[12px] font-bold uppercase tracking-wider py-1 px-3 rounded-full shadow-md z-10 flex items-center gap-1">
                <i className="bi bi-star-fill text-yellow-300"></i>
                Melhor Preço
            </div>
        )}
      <div className="p-5 flex gap-4">
        {/* Capa do Livro */}
        <div className="w-24 h-36 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
          <img src={livro.imagem} alt={livro.titulo} className="w-full h-full object-cover" />
        </div>
        
        {/* Informações Principais */}
        <div className="flex flex-col flex-grow justify-between">
          <div>
            <h3 className="font-bold text-lg text-slate-800 leading-tight line-clamp-2">
              {livro.titulo}
            </h3>
            <p className="text-sm text-gray-500 mt-1">{livro.autor}</p>
          </div>
          
          <div className="mt-3">
            {livro.preco != 2147483647 && //2147483647 é o val Max de Int, usado para representar ausencia de preço
            <>
            <p className="text-xs text-gray-400 uppercase font-semibold">Preço</p>
            <p className="text-2xl font-bold text-emerald-600">
              R$ {livro.preco.toFixed(2).replace('.', ',')}
            </p>
            </>}
            <p className="text-xs text-gray-500">via {livro.loja}</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 mt-auto justify-center flex justify-items-center items-center gap-10">
        <a 
          href={livro.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-3 py-1 bg-indigo-600 border border-gray-300 rounded-full hover:bg-indigo-700 transition-colors text-xs font-bold text-white"
        >
          Ir à loja
        </a>
      </div>
    </div>


  );
};

export default LivroSeachCard;