package com.equipo1.ecommerce.backend.repository;

import com.equipo1.ecommerce.backend.model.Cart;
import com.equipo1.ecommerce.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUser(User user);
}
