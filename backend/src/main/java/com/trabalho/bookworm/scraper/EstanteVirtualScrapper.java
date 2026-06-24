package com.trabalho.bookworm.scraper;

import com.trabalho.bookworm.model.Livro;
import com.trabalho.bookworm.util.Constantes;
import com.trabalho.bookworm.util.Verificador;

import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

import java.math.BigDecimal;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;

@Component
public class EstanteVirtualScrapper implements LivrariaScraper {
    @Override
    public Livro buscarLivro(String pesquisa) {

        try {

            //pesquisa = pesquisa.replace(" ","%20");
            String pesquisaTratada = URLEncoder.encode(pesquisa, StandardCharsets.UTF_8); //para formatar acentos também

            String url = Constantes.ESTANTEVIRTUAL_PREFIXO_URL + pesquisaTratada + Constantes.ESTANTEVIRTUAL_SUFIXO_URL;

            Document doc = Jsoup.connect(url)
                .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36")
                .header("Accept-Language", "pt-BR,pt;q=0.9")
                .header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8")
                .timeout(10000)
                .get();

            Element produto = doc.selectFirst(".product-item");

            if (produto == null) {
                return null;
            }

            String titulo = produto.select(".product-item__info .product-item__header h2").text().toLowerCase();

            if(Verificador.pesquisaEmTitulo(pesquisa, titulo)){
                return null;
            }

            String precoTexto = produto.select(".product-item__info .product-item__buy-area .product-item__text .product-item__sale-price").text()
                .replace("R$", "")
                .replace(" ", "")
                .replace(",", ".");

            produto.selectFirst(".product-item__cover img").attributes().forEach(attr ->
                System.out.println(attr.getKey() + " = " + attr.getValue())
            );

            // System.out.println(doc.html().contains("https://static.estantevirtual.com.br/book/00/08R-5826-000/08R-5826-000_detail1.jpg?"));

            // System.out.println(doc.html());

            // String html = doc.html();

            // int pos = html.indexOf("08R-5826-000_detail1.jpg");

            // System.out.println(
            //     html.substring(
            //         Math.max(0, pos - 500),
            //         Math.min(html.length(), pos + 500)
            //     )
            // );

            // Elements scripts = doc.select("script[type=application/Id+json]");
            // System.out.println(scripts);
        
            //System.out.println("\nTeste! : : : " + precoTexto);



            //
            BigDecimal preco = new BigDecimal(precoTexto);

            String link = produto.select(".product-item__link").attr("abs:href");


            String imagem = "";
            Elements scripts = doc.select("script[type=application/ld+json]");

            for (Element s : scripts) {

                String conteudo = s.html();

                if (conteudo.contains("\"ItemList\"")) {

                    JsonNode root = new ObjectMapper().readTree(conteudo);
                    JsonNode items = root.path("itemListElement");

                    if (items.isArray() && items.size() > 0) {
                        JsonNode firstItem = items.get(0).path("item");
                        imagem = firstItem.path("image").asString();
                    }
                    break; 
                }
            }

            //String imagem = produto.select(".product-item__cover img").attr("src");

            String autor = produto.select(".product-item__info .product-item__author").text();

            return new Livro(titulo, preco, "Livraria Estante Virtual", link, autor, imagem);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }
}