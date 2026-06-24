package com.trabalho.bookworm.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.trabalho.bookworm.dto.LivroDto;
import com.trabalho.bookworm.model.Livro;
import com.trabalho.bookworm.scraper.LivrariaScraper;

@Service
public class AgregadorLivrariasService {
    @Autowired
    private List<LivrariaScraper> scrapers;

    public List<LivroDto> buscarEmTodasLivrarias(String titulo){
        List<Livro> livros = new ArrayList<>();
        for(LivrariaScraper scraper : scrapers){
            livros.add(scraper.buscarLivro(titulo));
        }
        BigDecimal menorPreco = new BigDecimal(-1);
        List<LivroDto> livrosDto = new ArrayList<>();
        for(Livro livro : livros){
            if (livro == null){
                //System.out.println("Nao Achei");
                continue;
            };
            if(menorPreco.compareTo(new BigDecimal(0))<0 || livro.getPreco().compareTo(menorPreco) < 0){
                menorPreco = livro.getPreco();
            }
            livrosDto.add(new LivroDto(livro.getTitulo(), livro.getPreco(), livro.getLoja()
                            , livro.getLink(), livro.getAutor(), livro.getImagem(), false));
        }

        //System.out.println(menorPreco);
        
        for(LivroDto livroDto : livrosDto){
            if(livroDto.getPreco().compareTo(menorPreco) == 0){
                livroDto.setMelhor(true);
                break;
            }
        }

        return livrosDto;
    }
}
