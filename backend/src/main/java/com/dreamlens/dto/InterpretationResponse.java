package com.dreamlens.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class InterpretationResponse {
    private String mode;
    private String responseLanguage;
    private String dreamSummary;
    private String emotionalLandscape;
    private String culturalContext;
    private List<SymbolDto> symbols;
    private List<TheoreticalExplanationDto> theoreticalExplanations;
    private List<ScripturalPassageDto> scripturalPassages;
    private List<String> reflectionQuestions;
    private String uncertainties;
    private List<CitationDto> citations;
    private String timestamp;
    private long processingTimeMs;
    private String aiProviderUsed;

    public InterpretationResponse() {}

    public String getMode() { return mode; }
    public void setMode(String mode) { this.mode = mode; }

    public String getResponseLanguage() { return responseLanguage; }
    public void setResponseLanguage(String responseLanguage) { this.responseLanguage = responseLanguage; }

    public String getDreamSummary() { return dreamSummary; }
    public void setDreamSummary(String dreamSummary) { this.dreamSummary = dreamSummary; }

    public String getEmotionalLandscape() { return emotionalLandscape; }
    public void setEmotionalLandscape(String emotionalLandscape) { this.emotionalLandscape = emotionalLandscape; }

    public String getCulturalContext() { return culturalContext; }
    public void setCulturalContext(String culturalContext) { this.culturalContext = culturalContext; }

    public List<SymbolDto> getSymbols() { return symbols; }
    public void setSymbols(List<SymbolDto> symbols) { this.symbols = symbols; }

    public List<TheoreticalExplanationDto> getTheoreticalExplanations() { return theoreticalExplanations; }
    public void setTheoreticalExplanations(List<TheoreticalExplanationDto> theoreticalExplanations) { this.theoreticalExplanations = theoreticalExplanations; }

    public List<ScripturalPassageDto> getScripturalPassages() { return scripturalPassages; }
    public void setScripturalPassages(List<ScripturalPassageDto> scripturalPassages) { this.scripturalPassages = scripturalPassages; }

    public List<String> getReflectionQuestions() { return reflectionQuestions; }
    public void setReflectionQuestions(List<String> reflectionQuestions) { this.reflectionQuestions = reflectionQuestions; }

    public String getUncertainties() { return uncertainties; }
    public void setUncertainties(String uncertainties) { this.uncertainties = uncertainties; }

    public List<CitationDto> getCitations() { return citations; }
    public void setCitations(List<CitationDto> citations) { this.citations = citations; }

    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }

    public long getProcessingTimeMs() { return processingTimeMs; }
    public void setProcessingTimeMs(long processingTimeMs) { this.processingTimeMs = processingTimeMs; }

    public String getAiProviderUsed() { return aiProviderUsed; }
    public void setAiProviderUsed(String aiProviderUsed) { this.aiProviderUsed = aiProviderUsed; }
}
