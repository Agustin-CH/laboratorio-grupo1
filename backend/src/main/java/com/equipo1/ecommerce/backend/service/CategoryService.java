package com.equipo1.ecommerce.backend.service;

import com.equipo1.ecommerce.backend.model.Category;

import java.util.List;
import java.util.Optional;

public interface CategoryService {

    List<Category> listAll();

    Optional<Category> getById(Long id);

    Category create(Category category);

    Optional<Category> update(Long id, Category category);

    boolean delete(Long id);
}
