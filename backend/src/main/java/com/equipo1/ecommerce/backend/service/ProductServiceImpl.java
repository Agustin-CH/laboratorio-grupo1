package com.equipo1.ecommerce.backend.service;

import com.equipo1.ecommerce.backend.model.Product;
import com.equipo1.ecommerce.backend.repository.ProductRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepo;

    public ProductServiceImpl(ProductRepository productRepo) {
        this.productRepo = productRepo;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Product> listAll() {
        return productRepo.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Product> getById(Long id) {
        return productRepo.findById(id);
    }

    @Override
    @Transactional
    public Product create(Product newProduct) {
        if (newProduct.getPrice().compareTo(java.math.BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("El precio no puede ser negativo");
        }
        return productRepo.save(newProduct);
    }

    @Override
    @Transactional
    public Optional<Product> update(Long id, Product updatedProduct) {
        return productRepo.findById(id)
                .map(existing -> {
                    // Lógica de negocio: sólo actualiza campos permitidos
                    existing.setName(updatedProduct.getName());
                    existing.setDescription(updatedProduct.getDescription());
                    existing.setPrice(updatedProduct.getPrice());
                    existing.setStock(updatedProduct.getStock());
                    return productRepo.save(existing);
                });
    }

    @Override
    @Transactional
    public boolean delete(Long id) {
        return productRepo.findById(id)
                .map(existing -> {
                    productRepo.deleteById(id);
                    return true;
                })
                .orElse(false);
    }


    @Override
    @Transactional(readOnly = true)
    public List<Product> searchByName(String term) {
        return productRepo.findByNameContainingIgnoreCase(term);
    }
}
