package com.equipo1.ecommerce.backend.controller;

import com.equipo1.ecommerce.backend.exception.ResourceNotFoundException;
import com.equipo1.ecommerce.backend.model.Category;
import com.equipo1.ecommerce.backend.service.CategoryService;

import org.apache.catalina.connector.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<List<Category>> getAll() {
        return ResponseEntity.ok(categoryService.listAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> getById(@PathVariable Long id) {
        Category category = categoryService.getById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categoria con ID " + id + " no encontrada"));
        return ResponseEntity.ok(category);
    }

    @PostMapping
    public ResponseEntity<Category> create(@RequestBody Category category) {
        Category created = categoryService.create(category);
        return ResponseEntity.created(URI.create(null)).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Category> update(@PathVariable Long id, @RequestBody Category category) {
        return categoryService.update(id, category)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return categoryService.delete(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
