package com.trabalho.bookworm.scraper;

import com.trabalho.bookworm.model.Livro;
import com.trabalho.bookworm.util.Constantes;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

public class LeituraScraper {

    public Livro buscarLivro(String pesquisa) {

        try {

            pesquisa = pesquisa.replace(" ","%20");
            //pesquisa = URLEncoder.encode(pesquisa, StandardCharsets.UTF_8); //para formatar acentos também

            String url = Constantes.LEITURA_URL + pesquisa;

            Document doc = Jsoup.connect(url)
                .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36")
                .header("Accept-Language", "pt-BR,pt;q=0.9")
                .header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8")
                .get();

            Element produto = doc.selectFirst(".product-thumb");

            if (produto == null) {
                return null;
            }

            String titulo = produto.select(".caption h4 a").text();

            String precoTexto = produto.select(".caption .price .price-new").text()
                .replace("R$", "")
                .replace(",", ".");

            double preco = Double.parseDouble(precoTexto);

            String link = produto.select(".image a").attr("href");

            String imagem = produto.select(".image a img").attr("src");

            return new Livro(titulo, preco, "Livraria Leitura", link, null, imagem);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }
}