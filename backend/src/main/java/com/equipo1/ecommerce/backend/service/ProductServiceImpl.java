package com.equipo1.ecommerce.backend.service;

import com.equipo1.ecommerce.backend.dto.ProductDTO;
import com.equipo1.ecommerce.backend.model.Product;
import com.equipo1.ecommerce.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;
import com.equipo1.ecommerce.backend.exception.BadRequestException;
import com.equipo1.ecommerce.backend.exception.ResourceNotFoundException;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepo;

    public ProductServiceImpl(ProductRepository productRepo) {
        this.productRepo = productRepo;
    }

    @Override
    public List<ProductDTO> listAll() {
        return productRepo.findAll().stream().map(this::toDTO).toList();
    }

    @Override
    public Optional<ProductDTO> getById(Long id) {
        return productRepo.findById(id).map(this::toDTO);
    }

    @Override
    public ProductDTO create(ProductDTO dto) {
        if (dto.getPrice() == null || dto.getPrice().compareTo(BigDecimal.ZERO) < 0) {
            throw new BadRequestException("El precio no puede ser negativo o nulo");
        }
        if (dto.getName() == null || dto.getName().isBlank()) {
            throw new BadRequestException("El nombre del producto es obligatorio");
        }
        if (dto.getStock() == null || dto.getStock() < 0) {
            throw new BadRequestException("El stock no puede ser negativo o nulo");
        }

        Product product = new Product();
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setStock(dto.getStock());
        product.setImageUrl(dto.getImageUrl());

        return toDTO(productRepo.save(product));
    }

    @Override
    public ProductDTO update(Long id, ProductDTO dto) {
        Product product = productRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto con ID " + id + " no encontrado"));

            if (dto.getPrice() == null || dto.getPrice().compareTo(BigDecimal.ZERO) < 0) {
                throw new BadRequestException("El precio no puede ser negativo o nulo");
            }
            if (dto.getName() == null || dto.getName().isBlank()) {
                throw new BadRequestException("El nombre del producto es obligatorio");
            }
            if (dto.getStock() == null || dto.getStock() < 0) {
                throw new BadRequestException("El stock no puede ser negativo o nulo");
            }

            product.setName(dto.getName());
            product.setDescription(dto.getDescription());
            product.setPrice(dto.getPrice());
            product.setStock(dto.getStock());
            product.setImageUrl(dto.getImageUrl());
            return toDTO(productRepo.save(product));
    }

    @Override
    public boolean delete(Long id) {
        return productRepo.findById(id).map(p -> {
            productRepo.delete(p);
            return true;
        }).orElseThrow(() -> new ResourceNotFoundException("Producto con ID " + id + " no encontrado"));
    }

    @Override
    public List<ProductDTO> searchByName(String term) {
        return productRepo.findByNameContainingIgnoreCase(term)
                .stream().map(this::toDTO).toList();
    }

    @Override
    public List<ProductDTO> findByCategoryId(Long categoryId) {
        return productRepo.findByCategoryId(categoryId)
                .stream()
                .map(this::toDTO)
                .toList();
    }

    private ProductDTO toDTO(Product p) {
        ProductDTO dto = new ProductDTO();
        dto.setId(p.getId());
        dto.setName(p.getName());
        dto.setDescription(p.getDescription());
        dto.setPrice(p.getPrice());
        dto.setStock(p.getStock());
        dto.setImageUrl(p.getImageUrl());
        dto.setCategoryName(
                p.getCategory() != null
                        ? p.getCategory().getName()
                        : "");
        return dto;
    }
}