package com.equipo1.ecommerce.backend.service;

import com.equipo1.ecommerce.backend.dto.CategoryDTO;
import com.equipo1.ecommerce.backend.exception.ResourceNotFoundException;
import com.equipo1.ecommerce.backend.exception.BadRequestException;
import com.equipo1.ecommerce.backend.model.Category;
import com.equipo1.ecommerce.backend.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Category> listAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Category getById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categoria con ID " + id + " no encontrada"));
    }

    @Override
    public Category create(CategoryDTO dto) {
        if (dto.getName() == null || dto.getName().trim().isEmpty()) {
            throw new BadRequestException("El nombre de la categoría es obligatorio");
        }

        if (categoryRepository.existsByName(dto.getName())) {
            throw new BadRequestException("Ya existe una categoría con ese nombre");
        }

        Category category = new Category();
        category.setName(dto.getName());
        return categoryRepository.save(category);
    }

    @Override
    public Category update(Long id, CategoryDTO dto) { 
        Category existing = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada"));

        if (dto.getName() == null || dto.getName().trim().isEmpty()) {
            throw new BadRequestException("El nombre de la categoría es obligatorio");
        }

        existing.setName(dto.getName());
        return categoryRepository.save(existing);
    }

    @Override
    public void delete(Long id) { 
        if (!categoryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Categoría no encontrada");
        }
        categoryRepository.deleteById(id);
    }
}
