package com.trabalho.bookworm.util;

import java.text.Normalizer;
import java.util.regex.Pattern;

public class Verificador {

    private static final Pattern DIACRITICOS = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");

    public static String removerAcentos(String texto) {
        String normalizado = Normalizer.normalize(texto, Normalizer.Form.NFD);
        return DIACRITICOS.matcher(normalizado).replaceAll("");
    }

    public static Boolean pesquisaEmTitulo(String pesquisa, String titulo){
        String tituloTratado = removerAcentos(titulo).toLowerCase();
        String pesquisaTratada = removerAcentos(pesquisa).toLowerCase().replace("%20", " ");
        
        if(!(tituloTratado.contains(pesquisaTratada))){
            System.out.println("Titulo differente: " + titulo + " - " + pesquisa);
            return true;
        }
        return false;
    } 
}
