package com.example.Scretch.dto;

public class ProjectRequestDTO {
    private String title;
    private String description;
    private String codeJson;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCodeJson() {
        return codeJson;
    }

    public void setCodeJson(String codeJson) {
        this.codeJson = codeJson;
    }
}
