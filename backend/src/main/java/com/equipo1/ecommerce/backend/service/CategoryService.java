package com.equipo1.ecommerce.backend.service;

import com.equipo1.ecommerce.backend.dto.CategoryDTO;
import com.equipo1.ecommerce.backend.model.Category;

import java.util.List;

public interface CategoryService {

    List<Category> listAll();

    Category getById(Long id);

    Category create(CategoryDTO dto);

    Category update(Long id, CategoryDTO dto);

    void delete(Long id);
}
