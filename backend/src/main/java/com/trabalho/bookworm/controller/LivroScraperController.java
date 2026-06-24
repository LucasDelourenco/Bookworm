package com.trabalho.bookworm.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.trabalho.bookworm.dto.LivroDto;
import com.trabalho.bookworm.model.Livro;
import com.trabalho.bookworm.service.AgregadorLivrariasService;

@RestController
@RequestMapping("api/livros")
@CrossOrigin(origins = "*")
public class LivroScraperController {
    @Autowired
    private AgregadorLivrariasService agregadorLivrariaService;
    
    @GetMapping("/buscar")
    public List<LivroDto> buscarEmTodasLivrarias(@RequestParam String titulo){
        return agregadorLivrariaService.buscarEmTodasLivrarias(titulo);
    }
}
