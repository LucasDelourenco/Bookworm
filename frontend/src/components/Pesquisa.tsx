import _ from "lodash";
import useLivroStore from "../store/LivroStore";

const Pesquisa = () => {
  const setNome = useLivroStore((s) => s.setNome);
  
  const tratarPesquisa = (nome: string) => {
    setNome(nome);
  };

  const debouncedFunction = _.debounce((nome: string) => {
    tratarPesquisa(nome);
  }, 1000);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedFunction(event.target.value);
  };

  return (
    <div className="grid grid-cols-12">
        <input
        onChange={handleChange}
        type="text"
        className="input mb-3 col-span-3"
        placeholder="Informe o nome do Livro desejado..."
        />
    </div>
  );
};
export default Pesquisa;