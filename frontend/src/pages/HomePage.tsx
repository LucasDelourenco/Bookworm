import Pesquisa from "../components/Pesquisa";
import LivroCard, { type LivroMock } from "../components/LivroCard"; // Importe o componente que criamos

// Dados fictícios para demonstração do design
const mockLivros: LivroMock[] = [
  {
    titulo: "Hábitos Atômicos: Um Método Fácil e Comprovado de Criar Bons Hábitos...",
    autor: "James Clear",
    imagemUrl: "https://m.media-amazon.com/images/I/81eT2pjx4jL.jpg",
    ofertas: [
      { loja: "Amazon", preco: 32.29, link: "https://www.amazon.com.br/H%C3%A1bitos-At%C3%B4micos-M%C3%A9todo-Comprovado-Livrar/dp/8550807567/ref=sr_1_1?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&sr=8-1" },
      { loja: "Conservadora", preco: 53.59, link: "https://livrariaconservadora.com.br/habitos-atomicos?search=H%C3%A1bitos%20At%C3%B4micos" },
      { loja: "Estante Virtual", preco: 33.57, link: "https://www.estantevirtual.com.br/livro/habitos-atomicos-06D-6320-000-BK" }
    ]
  },
  {
    titulo: "O Senhor dos Anéis: A Sociedade do Anel",
    autor: "J.R.R. Tolkien",
    imagemUrl: "https://m.media-amazon.com/images/I/81hCVEC0ExL.jpg",
    ofertas: [
      { loja: "Amazon", preco: 47.40, link: "https://www.amazon.com.br/Senhor-dos-An%C3%A9is-Sociedade-Anel-ebook/dp/B07XL583JL/ref=sr_1_9?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&sr=8-9" },
      { loja: "Conservadora", preco: 62.17, link: "https://livrariaconservadora.com.br/o-senhor-dos-aneis-a-sociedade-do-anel?search=senhor%20dos%20aneis" },
      { loja: "Estante Virtual", preco: 31.92, link: "https://www.estantevirtual.com.br/livro/o-senhor-dos-aneis-a-sociedade-do-anel-094-0232-000-BK"}
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
