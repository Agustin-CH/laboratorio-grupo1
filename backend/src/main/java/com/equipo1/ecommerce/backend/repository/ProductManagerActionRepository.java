package com.equipo1.ecommerce.backend.repository;

import  com.equipo1.ecommerce.backend.model.ProductManagerAction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductManagerActionRepository extends JpaRepository<ProductManagerAction, Long> {
    List<ProductManagerAction> findByProductId(Long productId);
    List<ProductManagerAction> findByAdminId(Long adminId);
}
