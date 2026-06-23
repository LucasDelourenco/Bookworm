package com.trabalho.bookworm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.trabalho.bookworm.model.Livro;
import com.trabalho.bookworm.scraper.ConservadoraScraper;
import com.trabalho.bookworm.scraper.LeituraScraper;

import java.io.IOException;

import org.jsoup.*;
import org.jsoup.nodes.Document;

@SpringBootApplication
public class BookwormApplication {
    
	public static void main(String[] args) throws IOException {
        // downloading the target website with an HTTP GET request
        // Document doc = (Document) Jsoup
        //         .connect("https://quotes.toscrape.com/")
        //         .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36")
        //         .get();

        // LeituraScraper ls = new LeituraScraper();
        // Livro livro = ls.buscarLivro("pequeno principe");

        ConservadoraScraper cs = new ConservadoraScraper();
        Livro livro = cs.buscarLivro("codigo limpo");
        
        System.out.println(livro);

    }

}


// String pesquisa = "harry potter";
// pesquisa = pesquisa.replace(" ","%20");
// System.out.println(pesquisa);
