package com.trabalho.bookworm.scraper;

import java.math.BigDecimal;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;

import com.trabalho.bookworm.model.Livro;
import com.trabalho.bookworm.util.Constantes;

@Component
public class MaisBuscadosScraper {
    
    public  List<String> maisBuscados(){
        
        try {
            String url = Constantes.RANKING_URL;
            
            //System.out.println(url);

            Document doc = Jsoup.connect(url)
                .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36")
                .header("Accept-Language", "pt-BR,pt;q=0.9")
                .header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8")
                .timeout(100000)
                .get();

            // Element rankingElement = doc.selectFirst(".pn-ranking-livros-corpo clearfix");
            Elements nomesDosLivros = doc.select(".pn-ranking-livro-nome");// pega todos os livros do ranking
            List<String> livros = new ArrayList<>();

            // corta a lista pro top10
            int limite = Math.min(nomesDosLivros.size(), 10);

            for (int i = 0; i < limite; i++) {
                livros.add(nomesDosLivros.get(i).text());
            }
            
            return livros;


        } catch (Exception e) {
            System.out.println("deu ruim");
            e.printStackTrace();
            return null;
        }

    }
}
