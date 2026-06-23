import { useQuery } from "@tanstack/react-query";

const recuperarLivroPorTitulo = async (livro: number) => {
    //http://localhost:8080/api/livros/buscar?titulo=codigo%20limpo
    const response = await fetch("http://localhost:8080/api/livros/buscar?titulo=" + livro);
    if (!response.ok) {
        throw new Error(
            "Ocorreu um erro ao recuperar livros (" + livro + "). Status: " + response.status,
        );
    }
    return await response.json();
};

const useRecuperarLivroPorTitulo = (livro: number) => {
    return useQuery({
        queryKey: ["livros", livro],
        queryFn: () => recuperarLivroPorTitulo(livro),
    });
};
export default useRecuperarLivroPorTitulo;