package com.equipo1.ecommerce.backend.service;

import com.equipo1.ecommerce.backend.model.Category;
import com.equipo1.ecommerce.backend.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> listAll() {
        return categoryRepository.findAll();
    }

    public Optional<Category> getById(Long id) {
        return categoryRepository.findById(id);
    }

    public Category create(Category category) {
        if (categoryRepository.existsByName(category.getName())) {
            throw new IllegalArgumentException("La categoría ya existe");
        }
        return categoryRepository.save(category);
    }

    public Optional<Category> update(Long id, Category updatedCategory) {
        return categoryRepository.findById(id).map(existing -> {
            existing.setName(updatedCategory.getName());
            return categoryRepository.save(existing);
        });
    }

    public boolean delete(Long id) {
        if (!categoryRepository.existsById(id)) return false;
        categoryRepository.deleteById(id);
        return true;
    }
}
