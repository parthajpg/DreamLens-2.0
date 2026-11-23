package com.dreamlens.dto;

public class ScripturalPassageDto {
    private String source;
    private String chapter;
    private String page;
    private String sanskritVerse;
    private String translation;
    private String commentary;

    public ScripturalPassageDto() {}

    public ScripturalPassageDto(String source, String chapter, String page, String sanskritVerse, String translation, String commentary) {
        this.source = source;
        this.chapter = chapter;
        this.page = page;
        this.sanskritVerse = sanskritVerse;
        this.translation = translation;
        this.commentary = commentary;
    }

    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }

    public String getChapter() { return chapter; }
    public void setChapter(String chapter) { this.chapter = chapter; }

    public String getPage() { return page; }
    public void setPage(String page) { this.page = page; }

    public String getSanskritVerse() { return sanskritVerse; }
    public void setSanskritVerse(String sanskritVerse) { this.sanskritVerse = sanskritVerse; }

    public String getTranslation() { return translation; }
    public void setTranslation(String translation) { this.translation = translation; }

    public String getCommentary() { return commentary; }
    public void setCommentary(String commentary) { this.commentary = commentary; }
}
