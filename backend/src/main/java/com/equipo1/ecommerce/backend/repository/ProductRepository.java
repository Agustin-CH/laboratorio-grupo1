package com.equipo1.ecommerce.backend.repository;

import com.equipo1.ecommerce.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    /**
     * Devuelve todos los productos cuyo nombre contenga el término dado (case-insensitive).
     * Ejemplo: si term="lap", devuelve "Laptop", "lapicera", etc.
     */
    List<Product> findByNameContainingIgnoreCase(String term);
}
