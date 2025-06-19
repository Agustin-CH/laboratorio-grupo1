package com.equipo1.ecommerce.backend.service;

import com.equipo1.ecommerce.backend.dto.ProductDTO;
import com.equipo1.ecommerce.backend.model.Product;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    List<ProductDTO> listAll();
    Optional<ProductDTO> getById(Long id);
    ProductDTO create(ProductDTO newProduct);
    Optional<ProductDTO> update(Long id, ProductDTO updatedProduct);
    boolean delete(Long id);
    List<ProductDTO> searchByName(String term);
    List<ProductDTO> findByCategoryId(Long categoryId);
}


