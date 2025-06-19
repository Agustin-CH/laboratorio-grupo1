package com.equipo1.ecommerce.backend.service;

import com.equipo1.ecommerce.backend.model.Category;
import com.equipo1.ecommerce.backend.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService implements CategoryService {
    
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Category> listAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Optional<Category> getById(Long id) {
        return categoryRepository.findById(id);
    }

    @Override
    public Category create(Category category) {
        if (categoryRepository.existsByName(category.getName())) {
            throw new IllegalArgumentException("La categoría ya existe");
        }
        return categoryRepository.save(category);
    }

    @Override
    public Optional<Category> update(Long id, Category category) {
        return categoryRepository.findById(id).map(existing -> {
            existing.setName(category.getName());
            return categoryRepository.save(existing);
        });
    }

    @Override
    public boolean delete(Long id) {
        if (!categoryRepository.existsById(id)) return false;
        categoryRepository.deleteById(id);
        return true;
    }
}

