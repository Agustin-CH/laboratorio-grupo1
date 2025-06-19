package com.equipo1.ecommerce.backend.repository;

import com.equipo1.ecommerce.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByNameContainingIgnoreCase(String term);
    List<Product> findByCategoryId(Long categoryId);
}
