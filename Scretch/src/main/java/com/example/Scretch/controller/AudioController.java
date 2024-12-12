package com.example.Scretch.controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@RestController
@RequestMapping("/api/audio")
public class AudioController {

    @PostMapping("/upload")
    public ResponseEntity<String> uploadAudio(@RequestParam("file") MultipartFile file) {
        try {
            // Kiểm tra định dạng file
            if (!file.getContentType().startsWith("audio/")) {
                throw new RuntimeException("Invalid file type. Only audio files are allowed.");
            }

            // Lưu file vào thư mục local hoặc cloud storage (ví dụ: AWS S3)
            String filePath = saveFile(file);

            // Trả về URL của file đã lưu
            return ResponseEntity.ok(filePath);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload audio: " + e.getMessage());
        }
    }

    private String saveFile(MultipartFile file) throws IOException {
        // Lưu file vào thư mục local (ví dụ: /uploads)
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get("uploads", fileName);
        Files.createDirectories(filePath.getParent());
        Files.write(filePath, file.getBytes());

        // Trả về đường dẫn URL cho frontend
        return "/uploads/" + fileName; // Ví dụ URL: http://localhost:8080/uploads/file_name.mp3
    }

    @GetMapping("/play/{fileName}")
    public ResponseEntity<Resource> playAudio(@PathVariable String fileName) {
        try {
            // Đường dẫn file
            Path filePath = Paths.get("uploads", fileName);

            // Kiểm tra file có tồn tại
            if (!Files.exists(filePath)) {
                return ResponseEntity.notFound().build();
            }

            // Trả về file âm thanh dưới dạng Resource
            Resource resource = new UrlResource(filePath.toUri());
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_TYPE, "audio/mpeg") // Loại file là MP3
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

