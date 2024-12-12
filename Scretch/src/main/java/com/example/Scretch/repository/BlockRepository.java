package com.example.Scretch.repository;

import com.example.Scretch.entity.Block;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlockRepository extends JpaRepository<Block, Long> {
    boolean existsByName(String name); // Check nếu block đã tồn tại
}

