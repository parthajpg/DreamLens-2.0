package com.dreamlens.dto;

public class SymbolDto {
    private String symbol;
    private String meaning;
    private String traditionalSignificance;
    private String psychologicalMechanism;

    public SymbolDto() {}

    public SymbolDto(String symbol, String meaning, String traditionalSignificance, String psychologicalMechanism) {
        this.symbol = symbol;
        this.meaning = meaning;
        this.traditionalSignificance = traditionalSignificance;
        this.psychologicalMechanism = psychologicalMechanism;
    }

    public String getSymbol() { return symbol; }
    public void setSymbol(String symbol) { this.symbol = symbol; }

    public String getMeaning() { return meaning; }
    public void setMeaning(String meaning) { this.meaning = meaning; }

    public String getTraditionalSignificance() { return traditionalSignificance; }
    public void setTraditionalSignificance(String traditionalSignificance) { this.traditionalSignificance = traditionalSignificance; }

    public String getPsychologicalMechanism() { return psychologicalMechanism; }
    public void setPsychologicalMechanism(String psychologicalMechanism) { this.psychologicalMechanism = psychologicalMechanism; }
}
