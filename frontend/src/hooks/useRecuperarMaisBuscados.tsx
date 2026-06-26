import { useQuery } from "@tanstack/react-query";

const recuperarMaisBuscados = async (): Promise<string[]> => {
    const response = await fetch("http://localhost:8080/livros/mais-buscados");
    if(!response.ok){
        throw new Error("Ocorreu um erro ao recuperar os mais buscados.");
    }
    return await response.json();

};

const useRecuperarMaisBuscados = () => {
    return useQuery({
        queryKey: ["maisBuscados"],
        queryFn: recuperarMaisBuscados,
        staleTime : 1000 * 60 * 60 // 1h de cache 
    });
};

export default useRecuperarMaisBuscados
