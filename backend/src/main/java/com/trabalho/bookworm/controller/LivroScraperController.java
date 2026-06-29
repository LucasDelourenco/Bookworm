package com.trabalho.bookworm.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.trabalho.bookworm.dto.LivroDto;
import com.trabalho.bookworm.scraper.MaisBuscadosScraper;
import com.trabalho.bookworm.service.AgregadorLivrariasService;

@RestController
@RequestMapping("/livros")
@CrossOrigin("*")
public class LivroScraperController {
    @Autowired
    private AgregadorLivrariasService agregadorLivrariaService;

    @Autowired
    private MaisBuscadosScraper maisBuscadosScraper;
    
    @GetMapping("/buscar")
    public List<LivroDto> buscarEmTodasLivrarias(@RequestParam("q") String titulo){
        return agregadorLivrariaService.buscarEmTodasLivrarias(titulo);
    }

    @GetMapping("/mais-buscados")
    public ResponseEntity<List<String>> getMaisBuscados(){
        List<String> livros = maisBuscadosScraper.maisBuscados();
        if(livros == null || livros.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(livros);
    }

}
