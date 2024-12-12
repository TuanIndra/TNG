package com.example.Scretch.controller;

import com.example.Scretch.dto.ProjectRequestDTO;
import com.example.Scretch.dto.ProjectResponseDTO;
import com.example.Scretch.entity.Project;
import com.example.Scretch.service.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    //lay tat ca project
    @GetMapping
    public ResponseEntity<List<ProjectResponseDTO>> getAllProjects() {
        List<ProjectResponseDTO> responseDTOs = projectService.getAllProjects();
        return ResponseEntity.ok(responseDTOs);
    }

    //lay project theo id
    @GetMapping("/{id}")
    public ResponseEntity<ProjectResponseDTO> getProjectById(@PathVariable Long id) {
        ProjectResponseDTO responseDTO = projectService.getProjectById(id);
        return ResponseEntity.ok(responseDTO);
    }

    //xoa project theo id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }

    //sua thong tin project
    @PutMapping("/{id}")
    public ResponseEntity<ProjectResponseDTO> updateProject(
            @PathVariable Long id,
            @RequestBody ProjectRequestDTO projectRequestDTO) {
        ProjectResponseDTO responseDTO = projectService.updateProject(id, projectRequestDTO);
        return ResponseEntity.ok(responseDTO);
    }

    @PutMapping("/{id}/save-logic")
    public ResponseEntity<ProjectResponseDTO> saveLogic(
            @PathVariable Long id,
            @RequestBody Map<String, String> requestBody) {
        String codeJson = requestBody.get("codeJson");
        ProjectResponseDTO responseDTO = projectService.saveLogicToProject(id, codeJson);
        return ResponseEntity.ok(responseDTO);
    }

    @GetMapping("/{id}/export-block")
    public ResponseEntity<String> exportBlock(@PathVariable Long id) {
        // Sử dụng service có sẵn để lấy project
        ProjectResponseDTO project = projectService.getProjectById(id);

        // Kiểm tra nếu project không có logic JSON
        if (project.getCodeJson() == null || project.getCodeJson().isEmpty()) {
            throw new RuntimeException("No blocks to export for project with id: " + id);
        }

        // Trả về logic block dưới dạng JSON
        return ResponseEntity.ok(project.getCodeJson());
    }


    @PostMapping("/{id}/import-block")
    public ResponseEntity<ProjectResponseDTO> importBlock(
            @PathVariable Long id,
            @RequestBody String blockJson) {
        // Gọi service để lưu block logic
        ProjectResponseDTO updatedProject = projectService.saveLogicToProject(id, blockJson);

        // Trả về response với thông tin project đã cập nhật
        return ResponseEntity.ok(updatedProject);
    }

    // tao project
    @PostMapping
    public ResponseEntity<ProjectResponseDTO> createProject(@RequestBody ProjectRequestDTO projectRequestDTO) {
        ProjectResponseDTO responseDTO = projectService.createProject(projectRequestDTO);
        return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
    }

}
