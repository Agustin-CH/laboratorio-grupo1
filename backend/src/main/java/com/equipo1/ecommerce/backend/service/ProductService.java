package com.equipo1.ecommerce.backend.service;

import com.equipo1.ecommerce.backend.model.Product;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    List<Product> listAll();
    Optional<Product> getById(Long id);
    Product create(Product newProduct);
    Optional<Product> update(Long id, Product updatedProduct);
    boolean delete(Long id);
    List<Product> searchByName(String term);
}

