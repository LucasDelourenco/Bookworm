import { useQuery } from "@tanstack/react-query";

const recuperarLivroPorTitulo = async (livro: string) => {
  //http://localhost:8080/livros/buscar?q=codigo%20limpo
  const response = await fetch(
    "http://localhost:8080/livros/buscar?q=" + livro,
  );
  if (!response.ok) {
    throw new Error(
      "Ocorreu um erro ao recuperar livros (" +
        livro +
        "). Status: " +
        response.status,
    );
  }
  return await response.json();
};

const useRecuperarLivroPorTitulo = (livro: string) => {
  return useQuery({
    queryKey: ["livros", livro],
    queryFn: () => recuperarLivroPorTitulo(livro),
    staleTime: 1000 * 60 * 5,
    enabled: !!livro && livro.trim() !== "", // !! é um 'casting' para booleano
  });
};
export default useRecuperarLivroPorTitulo;
