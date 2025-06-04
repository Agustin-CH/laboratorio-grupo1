package com.equipo1.ecommerce.backend.repository;

import com.equipo1.ecommerce.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
