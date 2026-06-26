package com.trabalho.bookworm.util;

import java.text.Normalizer;
import java.util.regex.Pattern;

public class Verificador {

    private static final Pattern DIACRITICOS = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");

    public static String removerAcentos(String texto) {
        String normalizado = Normalizer.normalize(texto, Normalizer.Form.NFD);
        return DIACRITICOS.matcher(normalizado).replaceAll("");
    }

    public static Boolean pesquisaEmAlvo(String pesquisa, String alvo){
        String alvoTratado = removerAcentos(alvo).toLowerCase().strip();
        String pesquisaTratada = removerAcentos(pesquisa).toLowerCase().replace("%20", " ").strip();
        
        for(String parte : pesquisaTratada.split(" ")){
            if((alvoTratado.contains(parte))){
                return true;
            }
        }
        System.out.println("alvo differente: " + alvo + " - " + pesquisa);
        return false;
    } 
}
