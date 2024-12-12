package com.example.Scretch.dto;

import java.time.LocalDateTime;

public class ProjectResponseDTO {
    private Long id;
    private String title;
    private String description;
    private String codeJson;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public ProjectResponseDTO(Long id, String title, String description, String codeJson, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.codeJson = codeJson;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() {
        return id;
    }
    public String getTitle() {
        return title;
    }
    public String getDescription() {
        return description;
    }
    public String getCodeJson() {
        return codeJson;
    }
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
