package com.trabalho.bookworm.service;

import java.util.List;
import java.util.Objects;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.trabalho.bookworm.model.Livro;
import com.trabalho.bookworm.scraper.LivrariaScraper;

@Service
public class AgregadorLivrariasService {
    @Autowired
    private List<LivrariaScraper> scrapers;

    public List<Livro> buscarEmTodasLivrarias(String titulo){
        //Dispara o scraping de TODAS as livrarias em paralelo
        List<CompletableFuture<Livro>> futures = scrapers.stream()
            .map(scraper -> CompletableFuture.supplyAsync(() -> {
                try {
                    System.out.println("Disparando busca na: " + scraper.getClass().getSimpleName());
                    return scraper.buscarLivro(titulo);
                } catch (Exception e) {
                    System.err.println("Erro ao buscar na livraria " + scraper.getClass().getSimpleName());
                    return null; // Se uma falhar, retorna null para não quebrar as outras
                }
            }))
            .collect(Collectors.toList());

        // Cria um ponto de espera. O Java vai aguardar ATÉ QUE TODAS terminem de responder
        CompletableFuture<Void> livros = CompletableFuture.allOf(
            futures.toArray(new CompletableFuture[0])
        );

        // Junta os resultados de volta em uma lista normal de Livros quando tudo acabar
        return livros.thenApply(v -> 
            futures.stream()
                .map(CompletableFuture::join) // Pega o livro retornado de cada tarefa
                .filter(Objects::nonNull)      // Remove os resultados nulos (livros não encontrados ou erros)
                .collect(Collectors.toList())
        ).join(); // Segura a requisição do controller até o agregador ter a lista final
    }
}
