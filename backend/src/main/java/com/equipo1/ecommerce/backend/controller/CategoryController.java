package com.equipo1.ecommerce.backend.controller;

import com.equipo1.ecommerce.backend.dto.CategoryDTO;
import com.equipo1.ecommerce.backend.dto.ProductDTO;
import com.equipo1.ecommerce.backend.model.Category;
import com.equipo1.ecommerce.backend.service.CategoryService;
import com.equipo1.ecommerce.backend.service.ProductService;
import lombok.RequiredArgsConstructor;
import com.equipo1.ecommerce.backend.exception.BadRequestException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;
    private final ProductService productService;

    /** 1) Lista todas las categorías (sólo id+name) */
    @GetMapping
    public ResponseEntity<List<CategoryDTO>> getAll() {
        List<CategoryDTO> dtos = categoryService.listAll().stream()
                .map(c -> new CategoryDTO(c.getId(), c.getName()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    /** 2) Crea una nueva categoría */
    @PostMapping
    public ResponseEntity<CategoryDTO> create(@RequestBody CategoryDTO dto) {

        if (dto.getName() == null || dto.getName().trim().isEmpty()) {
            throw new BadRequestException("El nombre de la categoría es obligatorio");
        }

        Category saved = categoryService.create(dto);

        return ResponseEntity
                .created(URI.create("/api/categories/" + saved.getId()))
                .body(new CategoryDTO(saved.getId(), saved.getName()));
    }

    /** 3) Actualiza una categoría existente */
    @PutMapping("/{id}")
    public ResponseEntity<CategoryDTO> update(
            @PathVariable Long id,
            @RequestBody CategoryDTO dto) {
        if (dto.getName() == null || dto.getName().trim().isEmpty()) {
            throw new BadRequestException("El nombre de la categoría es obligatorio");
        }

        Category updated = categoryService.update(id, dto);
        return ResponseEntity.ok(new CategoryDTO(updated.getId(), updated.getName()));
    }

    /** 4) Borra una categoría */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        categoryService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/products")
    public ResponseEntity<List<ProductDTO>> getByCategory(@PathVariable Long id) {
        List<ProductDTO> prods = productService.findByCategoryId(id);
        return ResponseEntity.ok(prods);
    }
}