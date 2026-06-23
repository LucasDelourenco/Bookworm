import { create } from "zustand";
import type { Livro } from "../interfaces/Livro";

interface LivroStore {
    nome: string;   
    LivroSelecionado: Livro;

    setNome: (novoNome: string) => void;
    setLivroSelecionado: (novoLivroSelecionado: Livro) => void;
}

const useLivroStore = create<LivroStore>((set) => ({
    nome: "",
    LivroSelecionado: {} as Livro,
    
    setNome:  (novoNome: string) => set(() => ({nome: novoNome})),
    setLivroSelecionado: (novoLivroSelecionado: Livro) => 
        set(() => ({LivroSelecionado: novoLivroSelecionado}))
}))
export default useLivroStore