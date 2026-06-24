package com.trabalho.bookworm.scraper;

import java.math.BigDecimal;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import com.trabalho.bookworm.model.Livro;
import com.trabalho.bookworm.util.Constantes;
import com.trabalho.bookworm.util.Verificador;

import org.springframework.stereotype.Component;

@Component
public class TracaScraper implements LivrariaScraper {
    @Override
    public Livro buscarLivro(String pesquisa) {

        try {

            //pesquisa = pesquisa.replace(" ","%20");
            String pesquisaTratada = URLEncoder.encode(pesquisa, StandardCharsets.UTF_8); //para formatar acentos também

            String url = Constantes.TRACA_URL + pesquisaTratada;

            Document doc = Jsoup.connect(url)
                    .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36")
                    .header("Accept-Language", "pt-BR,pt;q=0.9")
                    .header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8")
                    .timeout(10000)
                    .get();

            Element produto = doc.selectFirst(".card-wrapper.product-card-wrapper");

            if (produto == null) {
                return null;
            }

            String titulo = produto.selectFirst(".card__heading a").text().toLowerCase();

            if(Verificador.pesquisaEmTitulo(pesquisa, titulo)){
                return null;
            }

            String textoPrecoBruto = produto.select(".price").text();

            // Divide a string no R$ 
            String[] partesPreco = textoPrecoBruto.split("R\\$");
            // Pega a última parte (o preço final)
            String ultimoPreco = partesPreco[partesPreco.length - 1];

            // Limpa caracteres e converte para double
            String precoTexto = ultimoPreco
                .replaceAll("[^0-9,]", "")
                .replace(" ", "")
                .replace(",", ".");
            BigDecimal preco = new BigDecimal(precoTexto);
            
            String link = produto.select(".card__heading a").attr("href");
            if (link.startsWith("/")) {
                link = "https://www.traca.com.br" + link;
            }
            link = link.replace(" ","%20");

            String imagem = produto.select(".card__media img").attr("srcset");
            if (imagem.startsWith("//")) {
                imagem = "https:" + imagem; // Garante que a URL fique completa
            }

            String autor = produto.select(".product-extra-info a").text();

            return new Livro(titulo, preco, "Livraria Traça", link, autor, imagem);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }
}