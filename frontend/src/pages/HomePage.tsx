import Pesquisa from "../components/Pesquisa";


const HomePage = () => {
  return (
    <>
      <h1 className="mb-1 text-xl font-semibold text-center">Busca de Livros</h1>
      <hr className="mb-4" />

      <Pesquisa />
      {/* <TabelaDeProdutosPessimista />
      <Paginacao /> */}
    </>
  );
};
export default HomePage;
