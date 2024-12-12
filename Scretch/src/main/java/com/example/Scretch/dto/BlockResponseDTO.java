package com.example.Scretch.dto;


import java.time.LocalDateTime;

public class BlockResponseDTO {
    private Long id;
    private String name;
    private String type;
    private String attributes;
    private String audioUrl;
    private LocalDateTime createdAt;

    public BlockResponseDTO(Long id, String name, String type, String attributes, String audioUrl, LocalDateTime createdAt) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.attributes = attributes;
        this.audioUrl = audioUrl;
        this.createdAt = createdAt;
    }

    // Getter
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getType() {
        return type;
    }

    public String getAttributes() {
        return attributes;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public String getAudioUrl() {
        return audioUrl;
    }
}

