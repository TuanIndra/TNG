package com.example.Scretch.controller;

import com.example.Scretch.dto.AudioBlockRequestDTO;
import com.example.Scretch.dto.BlockRequestDTO;
import com.example.Scretch.dto.BlockResponseDTO;
import com.example.Scretch.dto.ProjectResponseDTO;
import com.example.Scretch.entity.Block;
import com.example.Scretch.entity.Project;
import com.example.Scretch.repository.BlockRepository;
import com.example.Scretch.service.BlockService;
import com.example.Scretch.service.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/blocks")
public class BlockController {

    private final BlockService blockService;

    private final BlockRepository blockRepository;

    public BlockController(BlockService blockService, BlockRepository blockRepository) {
        this.blockService = blockService;
        this.blockRepository = blockRepository;
    }


    //tao block
    @PostMapping
    public ResponseEntity<BlockResponseDTO> createBlock(@RequestBody BlockRequestDTO blockRequestDTO) {
        BlockResponseDTO responseDTO = blockService.createBlock(blockRequestDTO);
        return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<BlockResponseDTO>> getAllBlocks() {
        List<Block> blocks = blockRepository.findAll();
        List<BlockResponseDTO> blockResponseDTOs = blocks.stream()
                .map(block -> new BlockResponseDTO(
                        block.getId(),
                        block.getName(),
                        block.getType(),
                        block.getAttributes(),
                        block.getAudioUrl(),
                        block.getCreatedAt()
                ))
                .collect(Collectors.toList());
        return ResponseEntity.ok(blockResponseDTOs);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BlockResponseDTO> updateBlock(
            @PathVariable Long id,
            @RequestBody BlockRequestDTO blockRequestDTO) {
        BlockResponseDTO blockResponseDTO = blockService.updateBlock(id, blockRequestDTO);
        return ResponseEntity.ok(blockResponseDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBlock(@PathVariable Long id) {
        blockService.deleteBlock(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/audio")
    public ResponseEntity<BlockResponseDTO> createAudioBlock(@RequestBody AudioBlockRequestDTO request) {
        BlockResponseDTO blockResponse = blockService.createAudioBlock(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(blockResponse);
    }

}

