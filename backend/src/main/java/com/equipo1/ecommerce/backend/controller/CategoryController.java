package com.equipo1.ecommerce.backend.controller;

import com.equipo1.ecommerce.backend.dto.CategoryDTO;
import com.equipo1.ecommerce.backend.dto.ProductDTO;
import com.equipo1.ecommerce.backend.model.Category;
import com.equipo1.ecommerce.backend.service.CategoryService;
import com.equipo1.ecommerce.backend.service.ProductService;
import lombok.RequiredArgsConstructor;
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
        var cat = new Category();
        cat.setName(dto.getName());
        Category saved = categoryService.create(cat);
        CategoryDTO out = new CategoryDTO(saved.getId(), saved.getName());
        return ResponseEntity
                .created(URI.create("/api/categories/" + saved.getId()))
                .body(out);
    }

    /** 3) Actualiza una categoría existente */
    @PutMapping("/{id}")
    public ResponseEntity<CategoryDTO> update(
            @PathVariable Long id,
            @RequestBody CategoryDTO dto
    ) {
        return categoryService.update(id, new Category(null, dto.getName(), null))
                .map(c -> new CategoryDTO(c.getId(), c.getName()))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /** 4) Borra una categoría */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return categoryService.delete(id)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}/products")
    public ResponseEntity<List<ProductDTO>> getByCategory(@PathVariable Long id) {
        List<ProductDTO> prods = productService.findByCategoryId(id);
        return ResponseEntity.ok(prods);
    }
}
