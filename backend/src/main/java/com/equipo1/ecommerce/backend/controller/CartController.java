package com.equipo1.ecommerce.backend.controller;

import com.equipo1.ecommerce.backend.dto.CartDTO;
import com.equipo1.ecommerce.backend.service.CartService;
import com.equipo1.ecommerce.backend.model.Cart;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    /**
     * GET /api/cart/{userId}
     * Obtiene el carrito del usuario.
     */
    @GetMapping("/{userId}")
    public ResponseEntity<CartDTO> getCart(@PathVariable Long userId) {
        Cart cart = cartService.getCartByUserId(userId);
        CartDTO dto = cartService.convertToDTO(cart);
        return ResponseEntity.ok(dto);
    }

    /**
     * POST /api/cart/{userId}/add/{productId}
     * Agrega un producto al carrito.
     */
    @PostMapping("/{userId}/add/{productId}")
    public ResponseEntity<CartDTO> addToCart(
            @PathVariable Long userId,
            @PathVariable Long productId,
            @RequestParam int quantity
    ) {
        try {
            Cart updatedCart = cartService.addItemToCart(userId, productId, quantity);
            return ResponseEntity.ok(cartService.convertToDTO(updatedCart));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * DELETE /api/cart/{userId}/remove/{productId}
     * Elimina un producto del carrito.
     */
    @DeleteMapping("/{userId}/remove/{productId}")
    public ResponseEntity<CartDTO> removeFromCart(
            @PathVariable Long userId,
            @PathVariable Long productId
    ) {
        Cart updatedCart = cartService.removeItemFromCart(userId, productId);
        return ResponseEntity.ok(cartService.convertToDTO(updatedCart));
    }

    /**
     * DELETE /api/cart/{userId}/clear
     * Vacía el carrito del usuario.
     */
    @DeleteMapping("/{userId}/clear")
    public ResponseEntity<Void> clearCart(@PathVariable Long userId) {
        cartService.clearCart(userId);
        return ResponseEntity.noContent().build();
    }
}
