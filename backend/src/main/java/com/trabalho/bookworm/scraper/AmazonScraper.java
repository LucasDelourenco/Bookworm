package com.trabalho.bookworm.scraper;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import com.trabalho.bookworm.model.Livro;
import com.trabalho.bookworm.util.Constantes;


public class AmazonScraper {
    public Livro buscarLivro(String pesquisa) {

        try {

            //pesquisa = pesquisa.replace(" ","%20");
            pesquisa = URLEncoder.encode(pesquisa, StandardCharsets.UTF_8); //para formatar acentos também

            String url = Constantes.AMAZON_PREFIXO_URL + pesquisa + Constantes.AMAZON_SUFIXO_URL;

            Document doc = Jsoup.connect(url)
                .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36")
                .header("Accept-Language", "pt-BR,pt;q=0.9")
                .header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8")
                .timeout(10000)
                .get();

            // Busca a primeira div que seja explicitamente um resultado de busca da Amazon
            Element produto = doc.selectFirst("div[data-component-type='s-search-result']");
            if (produto == null) {
                return null;
            }

            String titulo = produto.selectFirst("h2").text().toLowerCase();

            String precoTexto = produto.selectFirst(".a-price .a-offscreen").text()
                .replaceAll("[^0-9,]", "") // limpa o que ñ eh numero ou virgula 
                .replace(",", ".");;

           
            double preco = Double.parseDouble(precoTexto);
            
            // Busca a tag <a> que contenha o <h2> do titulo dentro dela
            String link = produto.selectFirst("a:has(h2)").attr("href");
            if (link.startsWith("/")) {
                link = "https://www.amazon.com.br" + link;
            }

           String imagem = produto.select(".s-image").attr("src");
            
           /* Ex:
            </span><span class="a-size-base">por 
            </span><span class="a-size-base">Alexandra Bracken</span> 
            */
            // Pega a linha inteira (Ex: "Edição Inglês | por Alexandra Bracken | 3 jan. 2023")
            Element elementoAutor = produto.selectFirst(".a-row.a-size-base.a-color-secondary");
            String autor = "Autor desconhecido";

            if (elementoAutor != null) {
                String textoCompleto = elementoAutor.text();

                // Se a frase tiver "por", jogamos fora o começo e pegamos o que vem depois
                if (textoCompleto.contains("por ")) {
                    autor = textoCompleto.split("por ")[1]; // Fica: "Alexandra Bracken | 3 jan. 2023"
                } else {
                    autor = textoCompleto;
                }

                // Se a frase tiver a barra "|", jogamos fora o final e pegamos o que vem antes
                if (autor.contains("|")) {
                    autor = autor.split("\\|")[0]; // Fica: "Alexandra Bracken "
                }

                // Limpa os espaços em branco
                autor = autor.trim(); 
            }

            return new Livro(titulo, preco, "Amazon", link, autor, imagem);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }
}
