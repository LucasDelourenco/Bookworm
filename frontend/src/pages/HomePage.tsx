import Pesquisa from "../components/Pesquisa";
import LivroCard, { type LivroMock } from "../components/LivroCard"; // Importe o componente que criamos

// Dados fictícios para demonstração do design
const mockLivros: LivroMock[] = [
  {
    titulo: "Hábitos Atômicos: Um Método Fácil e Comprovado de Criar Bons Hábitos...",
    autor: "James Clear",
    imagemUrl: "https://m.media-amazon.com/images/I/81eT2pjx4jL.jpg",
    ofertas: [
      { loja: "Amazon", preco: 44.90, link: "#" },
      { loja: "Submarino", preco: 52.00, link: "#" },
      { loja: "Mercado Livre", preco: 48.99, link: "#" }
    ]
  },
  {
    titulo: "O Senhor dos Anéis: A Sociedade do Anel",
    autor: "J.R.R. Tolkien",
    imagemUrl: "https://m.media-amazon.com/images/I/81hCVEC0ExL.jpg",
    ofertas: [
      { loja: "Amazon", preco: 55.00, link: "#" },
      { loja: "Shopee", preco: 49.90, link: "#" },
    ]
  }
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* Seção Hero */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">
            Encontre o <span className="text-indigo-600">melhor preço</span> para a sua próxima leitura.
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Comparamos preços nas maiores livrarias do Brasil para você economizar em todos os livros.
          </p>
        </div>

        <Pesquisa />

        {/* Resultados / Mocks */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-slate-800 mb-6">Resultados Recomendados</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockLivros.map((livro) => (
              <LivroCard key={livro.titulo} livro={livro} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default HomePage;
