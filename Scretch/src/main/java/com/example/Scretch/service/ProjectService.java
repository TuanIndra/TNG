package com.example.Scretch.service;

import com.example.Scretch.dto.ProjectRequestDTO;
import com.example.Scretch.dto.ProjectResponseDTO;
import com.example.Scretch.entity.Block;
import com.example.Scretch.entity.Project;
import com.example.Scretch.repository.BlockRepository;
import com.example.Scretch.repository.ProjectRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProjectService {

    private final ProjectRepository projectRepository;


    private final BlockRepository blockRepository;

    @Autowired
    public ProjectService(ProjectRepository projectRepository, BlockRepository blockRepository) {
        this.projectRepository = projectRepository;
        this.blockRepository = blockRepository;
    }

    public List<ProjectResponseDTO> getAllProjects() {
        return projectRepository.findAll().stream()
                .map(project -> new ProjectResponseDTO(
                        project.getId(),
                        project.getTitle(),
                        project.getDescription(),
                        project.getCodeJson(),
                        project.getCreatedAt(),
                        project.getUpdatedAt()
                )).collect(Collectors.toList());
    }

    public ProjectResponseDTO getProjectById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));

        return new ProjectResponseDTO(
                project.getId(),
                project.getTitle(),
                project.getDescription(),
                project.getCodeJson(),
                project.getCreatedAt(),
                project.getUpdatedAt()
        );
    }

    public void deleteProject(Long id) {
        if (!projectRepository.existsById(id)) {
            throw new RuntimeException("Project not found with id: " + id);
        }
        projectRepository.deleteById(id);
    }

    public ProjectResponseDTO updateProject(Long id, ProjectRequestDTO requestDTO) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));

        project.setTitle(requestDTO.getTitle());
        project.setDescription(requestDTO.getDescription());
        project.setCodeJson(requestDTO.getCodeJson());
        projectRepository.save(project);

        return new ProjectResponseDTO(
                project.getId(),
                project.getTitle(),
                project.getDescription(),
                project.getCodeJson(),
                project.getCreatedAt(),
                project.getUpdatedAt()
        );
    }

    // Hàm tạo project
    public ProjectResponseDTO createProject(ProjectRequestDTO requestDTO) {

        Project project = new Project();
        project.setTitle(requestDTO.getTitle());
        project.setDescription(requestDTO.getDescription());
        project.setCodeJson(requestDTO.getCodeJson());

        Project savedProject = projectRepository.save(project);
        return new ProjectResponseDTO(
                savedProject.getId(),
                savedProject.getTitle(),
                savedProject.getDescription(),
                savedProject.getCodeJson(),
                savedProject.getCreatedAt(),
                savedProject.getUpdatedAt()
        );
    }

    public ProjectResponseDTO saveLogicToProject(Long id, String codeJson) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));

        project.setCodeJson(codeJson); // Lưu JSON logic vào project
        projectRepository.save(project);

        return new ProjectResponseDTO(
                project.getId(),
                project.getTitle(),
                project.getDescription(),
                project.getCodeJson(),
                project.getCreatedAt(),
                project.getUpdatedAt()
        );
    }

}
