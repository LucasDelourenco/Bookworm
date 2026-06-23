package com.trabalho.bookworm.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.trabalho.bookworm.model.Livro;
import com.trabalho.bookworm.scraper.LivrariaScraper;

@Service
public class AgregadorLivrariasService {
    @Autowired
    private List<LivrariaScraper> scrapers;

    public List<Livro> buscarEmTodasLivrarias(String titulo){
        List<Livro> livros = new ArrayList<>();
        for(LivrariaScraper scraper : scrapers){
            livros.add(scraper.buscarLivro(titulo));
        }
        return livros;
    }
}
