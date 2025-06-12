package com.equipo1.ecommerce.backend.repository;

import com.equipo1.ecommerce.backend.model.CartItem;
import com.equipo1.ecommerce.backend.model.Cart;
import com.equipo1.ecommerce.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    Optional<CartItem> findByCartAndProduct(Cart cart, Product product);
    List<CartItem> findByCart(Cart cart);
}
