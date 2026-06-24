package com.trabalho.bookworm.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
//@Entity
@Setter
@NoArgsConstructor
public class Livro {

    private String imagem;
    private String autor;
    private String titulo;
    private double preco;
    private String loja;
    private String link;
    
    public Livro(String titulo, double preco, String loja, String link, String autor, String imagem) {
        this.imagem = imagem;
        this.autor = autor;
        this.titulo = titulo;
        this.preco = preco;
        this.loja = loja;
        this.link = link;
    }

    @Override
    public String toString() {
        return loja + "\n > " + titulo + "\n > R$ " + preco + "\n > " + link + "\n > " + autor + "\n > " + imagem;
    }
}