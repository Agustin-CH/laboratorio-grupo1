package com.equipo1.ecommerce.backend.controller;


import com.equipo1.ecommerce.backend.model.Product;
import com.equipo1.ecommerce.backend.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    // Inyectamos el Service, no el Repository directamente
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    /**
     * GET /api/products
     */
    @GetMapping
    public ResponseEntity<List<Product>> getAll() {
        List<Product> productos = productService.listAll();
        return ResponseEntity.ok(productos);
    }

    /**
     * GET /api/products/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<Product> getById(@PathVariable Long id) {
        return productService.getById(id)
                .map(prod -> ResponseEntity.ok(prod))
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * POST /api/products
     */
    @PostMapping
    public ResponseEntity<Product> create(@RequestBody Product newProduct) {
        try {
            Product saved = productService.create(newProduct);
            return ResponseEntity
                    .created(URI.create("/api/products/" + saved.getId()))
                    .body(saved);
        } catch (IllegalArgumentException ex) {
            // Por ejemplo, precio negativo
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * PUT /api/products/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<Product> update(
            @PathVariable Long id,
            @RequestBody Product updatedProduct) {

        return productService.update(id, updatedProduct)
                .map(prod -> ResponseEntity.ok(prod))
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * DELETE /api/products/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        boolean deleted = productService.delete(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchByName(@RequestParam("term") String term) {
        List<Product> results = productService.searchByName(term);
        return ResponseEntity.ok(results);
    }

}
