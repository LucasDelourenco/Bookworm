package com.trabalho.bookworm.dto;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
//@Entity
@Setter
@NoArgsConstructor
public class LivroDto {

    private String imagem;
    private String autor;
    private String titulo;
    private BigDecimal preco;
    private String loja;
    private String link;
    private Boolean melhor;
    
    public LivroDto(String titulo, BigDecimal preco, String loja, String link, String autor, String imagem, Boolean melhor) {
        this.imagem = imagem;
        this.autor = autor;
        this.titulo = titulo;
        this.preco = preco;
        this.loja = loja;
        this.link = link;
        this.melhor = melhor;
    }
}