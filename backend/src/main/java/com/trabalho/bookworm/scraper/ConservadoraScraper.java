package com.trabalho.bookworm.scraper;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Component;

import com.trabalho.bookworm.model.Livro;
import com.trabalho.bookworm.util.Constantes;

@Component
public class ConservadoraScraper implements LivrariaScraper{
    @Override
    public Livro buscarLivro(String pesquisa) {

        try {

            //pesquisa = pesquisa.replace(" ","%20");
            pesquisa = URLEncoder.encode(pesquisa, StandardCharsets.UTF_8); //para formatar acentos também

            String url = Constantes.CONSERVADORA_URL + pesquisa;

            Document doc = Jsoup.connect(url)
                    .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36")
                    .header("Accept-Language", "pt-BR,pt;q=0.9")
                    .header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8")
                    .timeout(10000)
                    .get();

            Element produto = doc.selectFirst(".item-product ");

            if (produto == null) {
                return null;
            }

            String titulo = produto.select(".name .product-name").text().toLowerCase();

            String precoTexto = produto.select(".price .price-new").text()
                    .replace(",", ".");

            double preco = Double.parseDouble(precoTexto);

            String link = produto.select(" a").attr("href");
            link = link.replace(" ","%20");


            //No ConservadoraScrapper, a imagem é pega do campo Data-original, 
            // pois, nessa estrutura é usada lazy load. Ou seja, o campo src inicia vazio 
            // e é preenchido com o valor do Data-original buscado em tempo de execucao
            String imagem = produto.select(".product-image .lazyload").attr("data-original");

            String autor = produto.select(".author a").text();

            return new Livro(titulo, preco, "Livrarias Conservadora", link, autor, imagem);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }
}