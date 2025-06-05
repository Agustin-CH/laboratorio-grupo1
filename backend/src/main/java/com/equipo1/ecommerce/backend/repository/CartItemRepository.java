package com.equipo1.ecommerce.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.equipo1.ecommerce.backend.model.CartItem;
import com.equipo1.ecommerce.backend.model.User;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUsuario(User usuario);
    void deleteByUsuario(User usuario);
}