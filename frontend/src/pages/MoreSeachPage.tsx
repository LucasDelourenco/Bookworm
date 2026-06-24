import LivroCard, { type LivroMock } from "../components/LivroCard";

const MoreSearchPage = () => {
  const livrosPopulares: LivroMock[] = [
    {
      titulo: "Hábitos Atômicos",
      autor: "James Clear",
      imagemUrl: "https://via.placeholder.com/150",
      ofertas: [
        { loja: "Amazon", preco: 45.90, link: "#" },
        { loja: "Mercado Livre", preco: 52.00, link: "#" },
        { loja: "Skoob", preco: 60.50, link: "#" }
      ]
    },
    {
      titulo: "1984",
      autor: "George Orwell",
      imagemUrl: "https://via.placeholder.com/150",
      ofertas: [
        { loja: "Submarino", preco: 29.90, link: "#" },
        { loja: "Amazon", preco: 35.00, link: "#" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Livros <span className="text-indigo-600">Mais Buscados</span>
          </h1>
          <p className="mt-2 text-gray-500">
            Confira as melhores ofertas das leituras que estão em alta no momento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {livrosPopulares.map((livro, index) => (
            <LivroCard key={index} livro={livro} />
          ))}
        </div>

      </div>
    </div>
  );
};
export default MoreSearchPage;