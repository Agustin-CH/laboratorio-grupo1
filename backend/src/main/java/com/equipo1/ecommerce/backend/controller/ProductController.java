package com.equipo1.ecommerce.backend.controller;


import com.equipo1.ecommerce.backend.dto.ProductDTO;
import com.equipo1.ecommerce.backend.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAll() {
        return ResponseEntity.ok(productService.listAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getById(@PathVariable Long id) {
        return productService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ProductDTO> create(@RequestBody ProductDTO dto) {
        try {
            ProductDTO created = productService.create(dto);
            return ResponseEntity.created(URI.create("/api/products/" + created.getId()))
                    .body(created);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> update(@PathVariable Long id, @RequestBody ProductDTO dto) {
        return productService.update(id, dto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return productService.delete(id) ?
                ResponseEntity.noContent().build() :
                ResponseEntity.notFound().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<ProductDTO>> search(@RequestParam String term) {
        return ResponseEntity.ok(productService.searchByName(term));
    }
}
