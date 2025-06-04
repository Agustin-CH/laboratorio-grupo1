package com.equipo1.ecommerce.backend.controller;

import com.equipo1.ecommerce.backend.model.Product;
import com.equipo1.ecommerce.backend.repository.ProductRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductRepository productRepo;

    public ProductController(ProductRepository productRepo) {
        this.productRepo = productRepo;
    }

    /**
     * GET /api/products
     * → Devuelve todos los productos.
     */
    @GetMapping
    public ResponseEntity<List<Product>> getAll() {
        List<Product> productos = productRepo.findAll();
        return ResponseEntity.ok(productos);
    }

    /**
     * GET /api/products/{id}
     * → Devuelve un producto por su ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Product> getById(@PathVariable Long id) {
        return productRepo.findById(id)
                .map(producto -> ResponseEntity.ok(producto))
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * POST /api/products
     * Body: JSON con los campos de Product (name, description, price, stock).
     * → Crea un producto nuevo.
     */
    @PostMapping
    public ResponseEntity<Product> create(@RequestBody Product newProduct) {
        Product saved = productRepo.save(newProduct);
        return ResponseEntity
                .created(URI.create("/api/products/" + saved.getId()))
                .body(saved);
    }

    /**
     * PUT /api/products/{id}
     * Body: JSON con los campos a actualizar.
     * → Actualiza un producto existente.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Product> update(
            @PathVariable Long id,
            @RequestBody Product updatedProduct) {

        return productRepo.findById(id)
                .map(existing -> {
                    existing.setName(updatedProduct.getName());
                    existing.setDescription(updatedProduct.getDescription());
                    existing.setPrice(updatedProduct.getPrice());
                    existing.setStock(updatedProduct.getStock());
                    Product saved = productRepo.save(existing);
                    return ResponseEntity.ok(saved);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * DELETE /api/products/{id}
     * → Elimina un producto por ID.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return productRepo.findById(id)
                .map(existing -> {
                    productRepo.deleteById(id);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}