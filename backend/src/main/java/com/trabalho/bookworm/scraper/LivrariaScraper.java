package com.trabalho.bookworm.scraper;

import com.trabalho.bookworm.model.Livro;

public interface LivrariaScraper {
    Livro buscarLivro(String titulo);
}
