package com.equipo1.ecommerce.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.equipo1.ecommerce.backend.model.CartItem;
import com.equipo1.ecommerce.backend.service.CartItemService;

@RestController
@RequestMapping("/api/cart")
public class CartItemController {

    @Autowired
    private CartItemService cartItemService;

    @GetMapping("/{userId}")
    public List<CartItem> getCartItems(@PathVariable Long userId) {
        return cartItemService.getCartItemsByUser(userId);
    }

    @PostMapping("/add")
    public CartItem addItem(@RequestParam Long userId,
                            @RequestParam Long productId,
                            @RequestParam int cantidad) {
        return cartItemService.addItemToCart(userId, productId, cantidad);
    }

    @DeleteMapping("/remove/{itemId}")
    public void removeItem(@PathVariable Long itemId) {
        cartItemService.removeItem(itemId);
    }

    @DeleteMapping("/clear/{userId}")
    public void clearCart(@PathVariable Long userId) {
        cartItemService.clearCart(userId);
    }
}