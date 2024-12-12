package com.example.Scretch.service;

import com.example.Scretch.dto.AudioBlockRequestDTO;
import com.example.Scretch.dto.BlockRequestDTO;
import com.example.Scretch.dto.BlockResponseDTO;
import com.example.Scretch.entity.Block;
import com.example.Scretch.repository.BlockRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BlockService {

    private final BlockRepository blockRepository;

    public BlockService(BlockRepository blockRepository) {
        this.blockRepository = blockRepository;
    }

    public BlockResponseDTO createBlock(BlockRequestDTO blockRequestDTO) {
        if (blockRepository.existsByName(blockRequestDTO.getName())) {
            throw new RuntimeException("Block with the same name already exists.");
        }

        Block block = new Block();
        block.setName(blockRequestDTO.getName());
        block.setType(blockRequestDTO.getType());
        block.setAttributes(blockRequestDTO.getAttributes());

        Block savedBlock = blockRepository.save(block);

        return new BlockResponseDTO(
                savedBlock.getId(),
                savedBlock.getName(),
                savedBlock.getType(),
                savedBlock.getAttributes(),
                savedBlock.getAudioUrl(),
                savedBlock.getCreatedAt()
        );
    }
    public BlockResponseDTO updateBlock(Long id, BlockRequestDTO blockRequestDTO) {
        Block block = blockRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Block not found with id: " + id));

        block.setName(blockRequestDTO.getName());
        block.setType(blockRequestDTO.getType());
        block.setAttributes(blockRequestDTO.getAttributes());

        Block updatedBlock = blockRepository.save(block);

        return new BlockResponseDTO(
                updatedBlock.getId(),
                updatedBlock.getName(),
                updatedBlock.getType(),
                updatedBlock.getAttributes(),
                updatedBlock.getAudioUrl(),
                updatedBlock.getCreatedAt()
        );
    }

    public void deleteBlock(Long id) {
        Block block = blockRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Block not found with id: " + id));
        blockRepository.delete(block);
    }

    public List<BlockResponseDTO> getAllBlocks() {
        return blockRepository.findAll().stream()
                .map(block -> new BlockResponseDTO(
                        block.getId(),
                        block.getName(),
                        block.getType(),
                        block.getAttributes(),
                        block.getAudioUrl(),
                        block.getCreatedAt()
                ))
                .collect(Collectors.toList());
    }

    public BlockResponseDTO createAudioBlock(AudioBlockRequestDTO request) {
        if (blockRepository.existsByName(request.getName())) {
            throw new RuntimeException("Block with the same name already exists.");
        }

        Block block = new Block();
        block.setName(request.getName());
        block.setType("audio");
        block.setAttributes(null); // Thuộc tính không cần thiết cho block âm thanh
        block.setAudioUrl(request.getAudioUrl());

        Block savedBlock = blockRepository.save(block);

        return new BlockResponseDTO(
                savedBlock.getId(),
                savedBlock.getName(),
                savedBlock.getType(),
                savedBlock.getAttributes(),
                savedBlock.getAudioUrl(),
                savedBlock.getCreatedAt()
        );
    }
}

