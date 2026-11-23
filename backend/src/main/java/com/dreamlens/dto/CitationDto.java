package com.dreamlens.dto;

public class CitationDto {
    private String sourceTitle;
    private String author;
    private String chapter;
    private String page;
    private String excerpt;
    private String relevance;

    public CitationDto() {}

    public CitationDto(String sourceTitle, String author, String chapter, String page, String excerpt, String relevance) {
        this.sourceTitle = sourceTitle;
        this.author = author;
        this.chapter = chapter;
        this.page = page;
        this.excerpt = excerpt;
        this.relevance = relevance;
    }

    public String getSourceTitle() { return sourceTitle; }
    public void setSourceTitle(String sourceTitle) { this.sourceTitle = sourceTitle; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public String getChapter() { return chapter; }
    public void setChapter(String chapter) { this.chapter = chapter; }

    public String getPage() { return page; }
    public void setPage(String page) { this.page = page; }

    public String getExcerpt() { return excerpt; }
    public void setExcerpt(String excerpt) { this.excerpt = excerpt; }

    public String getRelevance() { return relevance; }
    public void setRelevance(String relevance) { this.relevance = relevance; }
}
