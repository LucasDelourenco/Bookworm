// src/components/LivroCard.tsx
import React from 'react';

export interface Oferta {
  titulo?: string;
  autor?: string;
  imagemUrl?: string;
  loja: string;
  preco: number;
  link: string;
}

export interface LivroMock {
  titulo: string;
  autor: string;
  imagemUrl: string;
  ofertas: Oferta[];
}

interface LivroCardProps {
  livro: LivroMock;
}

const LivroCard: React.FC<LivroCardProps> = ({ livro }) => {
  const ofertasOrdenadas = [...livro.ofertas].sort((a, b) => a.preco - b.preco);
  const melhorOferta = ofertasOrdenadas[0];

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="p-5 flex gap-4">
        {/* Capa do Livro */}
        <div className="w-24 h-36 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
          <img src={livro.imagemUrl} alt={livro.titulo} className="w-full h-full object-cover" />
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
            <p className="text-xs text-gray-400 uppercase font-semibold">Melhor Preço</p>
            <p className="text-2xl font-bold text-emerald-600">
              R$ {melhorOferta.preco.toFixed(2).replace('.', ',')}
            </p>
            <p className="text-xs text-gray-500">via {melhorOferta.loja}</p>
          </div>
        </div>
      </div>

      {/* Tabela de Comparação */}
      <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 mt-auto">
        <p className="text-xs font-semibold text-gray-600 mb-2 uppercase">Comparar Lojas</p>
        <div className="space-y-2">
          {ofertasOrdenadas.map((oferta, index) => (
            <div key={index} className="flex justify-between items-center text-sm">
              <span className="text-gray-700">{oferta.loja}</span>
              <div className="flex items-center gap-3">
                <span className="font-medium text-gray-900">R$ {oferta.preco.toFixed(2).replace('.', ',')}</span>
                <div className="flex-shrink-0">
                    <a 
                      href={oferta.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-indigo-600 border border-gray-300 rounded-full hover:bg-indigo-700 transition-colors text-xs font-bold text-white"
                    >
                      Ir à loja
                    </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LivroCard;