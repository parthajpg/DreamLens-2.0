package com.dreamlens.dto;

public class InterpretationRequest {
    private String dreamText;
    private String mode; // PSYCHOLOGY or HINDU_MYTHOLOGY
    private String inputLanguage; // ENGLISH, TAMIL, TANGLISH
    private String responseLanguage; // ENGLISH, TAMIL, TANGLISH
    private String emotionalState;
    private String additionalContext;

    public InterpretationRequest() {}

    public String getDreamText() { return dreamText; }
    public void setDreamText(String dreamText) { this.dreamText = dreamText; }

    public String getMode() { return mode; }
    public void setMode(String mode) { this.mode = mode; }

    public String getInputLanguage() { return inputLanguage; }
    public void setInputLanguage(String inputLanguage) { this.inputLanguage = inputLanguage; }

    public String getResponseLanguage() { return responseLanguage; }
    public void setResponseLanguage(String responseLanguage) { this.responseLanguage = responseLanguage; }

    public String getEmotionalState() { return emotionalState; }
    public void setEmotionalState(String emotionalState) { this.emotionalState = emotionalState; }

    public String getAdditionalContext() { return additionalContext; }
    public void setAdditionalContext(String additionalContext) { this.additionalContext = additionalContext; }
}
