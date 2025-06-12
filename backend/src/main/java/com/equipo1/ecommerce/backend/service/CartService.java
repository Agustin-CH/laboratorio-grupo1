package com.equipo1.ecommerce.backend.service;

import com.equipo1.ecommerce.backend.model.*;
import com.equipo1.ecommerce.backend.repository.*;
import com.equipo1.ecommerce.backend.dto.CartDTO;
import com.equipo1.ecommerce.backend.dto.CartItemDTO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
import java.math.BigDecimal;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public CartService(CartRepository cartRepository, CartItemRepository cartItemRepository,
            ProductRepository productRepository, UserRepository userRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    public Cart getCartByUserId(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return cartRepository.findByUser(user).orElseGet(() -> {
            Cart newCart = new Cart();
            newCart.setUser(user);
            return cartRepository.save(newCart);
        });
    }

    @Transactional
    public Cart addItemToCart(Long userId, Long productId, int quantity) {
        Cart cart = getCartByUserId(userId);
        Product product = productRepository.findById(productId).orElseThrow();

        CartItem item = cartItemRepository.findByCartAndProduct(cart, product)
                .orElse(new CartItem(null, cart, product, 0));

        item.setQuantity(item.getQuantity() + quantity);
        cartItemRepository.save(item);

        return cartRepository.findById(cart.getId()).orElseThrow();
    }

    @Transactional
    public Cart removeItemFromCart(Long userId, Long productId) {
    Cart cart = getCartByUserId(userId);

    cart.getItems().removeIf(item -> item.getProduct().getId().equals(productId));

    return cartRepository.save(cart);
}

    @Transactional
    public void clearCart(Long userId) {
        Cart cart = getCartByUserId(userId);
        List<CartItem> items = cartItemRepository.findByCart(cart);
        cartItemRepository.deleteAll(items);
    }

    public CartDTO convertToDTO(Cart cart) {
        List<CartItemDTO> itemDTOs = cart.getItems().stream().map(item -> {
            BigDecimal unitPrice = item.getProduct().getPrice();
            BigDecimal subtotal = unitPrice.multiply(BigDecimal.valueOf(item.getQuantity()));
            return new CartItemDTO(
                    item.getProduct().getId(),
                    item.getProduct().getName(),
                    item.getQuantity(),
                    unitPrice,
                    subtotal);
        }).collect(Collectors.toList());

        BigDecimal total = itemDTOs.stream()
                .map(CartItemDTO::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return new CartDTO(
                cart.getId(),
                cart.getUser().getId(),
                itemDTOs,
                total);
    }
}
