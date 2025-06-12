package com.equipo1.ecommerce.backend.service;

import com.equipo1.ecommerce.backend.model.Cart;
import com.equipo1.ecommerce.backend.dto.CartDTO;
import org.springframework.transaction.annotation.Transactional;

public interface CartService {
    Cart getCartByUserId(Long userId);
    
    @Transactional
    Cart addItemToCart(Long userId, Long productId, int quantity);
    
    @Transactional
    Cart removeItemFromCart(Long userId, Long productId);
    
    @Transactional
    void clearCart(Long userId);
    
    CartDTO convertToDTO(Cart cart);
}