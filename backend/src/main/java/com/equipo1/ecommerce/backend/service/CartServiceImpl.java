package com.equipo1.ecommerce.backend.service;

import com.equipo1.ecommerce.backend.model.*;
import com.equipo1.ecommerce.backend.repository.*;

import jakarta.annotation.Resource;

import com.equipo1.ecommerce.backend.dto.CartDTO;
import com.equipo1.ecommerce.backend.dto.CartItemDTO;
import com.equipo1.ecommerce.backend.exception.ResourceNotFoundException;
import com.equipo1.ecommerce.backend.exception.BadRequestException;
import com.equipo1.ecommerce.backend.exception.BusinessRuleException;
import com.equipo1.ecommerce.backend.exception.ResourceNotFoundException;


//import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
import java.math.BigDecimal;

@Service
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public CartServiceImpl(CartRepository cartRepository, CartItemRepository cartItemRepository,
                           ProductRepository productRepository, UserRepository userRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Cart getCartByUserId(Long userId) {
        User user = userRepository.findById(userId)
        .orElseThrow(() -> new ResourceNotFoundException("Usuario con ID " + userId + " no encontrado"));
        return cartRepository.findByUser(user).orElseGet(() -> {
            Cart newCart = new Cart();
            newCart.setUser(user);
            return cartRepository.save(newCart);
        });
    }

    @Override
    @Transactional
    public Cart addItemToCart(Long userId, Long productId, int quantity) {
        
        if (quantity <= 0) {
            throw new BadRequestException("La cantidad debe ser mayor a cero.");
        }

        Cart cart = getCartByUserId(userId);
        
        Product product = productRepository.findById(productId)
            .orElseThrow(() -> new ResourceNotFoundException("Producto con ID " + productId + " no encontrado"));

        if (product.getStock() < quantity){
            throw new BusinessRuleException("Stock insuficiente para el producto: " + product.getName());
        }

        CartItem item = cartItemRepository.findByCartAndProduct(cart, product)
                .orElse(new CartItem(null, cart, product, 0));

        item.setQuantity(item.getQuantity() + quantity);
        cartItemRepository.save(item);

        return cartRepository.findById(cart.getId()).orElseThrow(() -> new ResourceNotFoundException("Carrito con ID " + cart.getId() + " no encontrado"));
    }

    @Override
    @Transactional
    public Cart removeItemFromCart(Long userId, Long productId) {
        Cart cart = getCartByUserId(userId);
        
        
        boolean removed = cart.getItems().removeIf(item -> item.getProduct().getId().equals(productId));
        
        if (!removed){
            throw new ResourceNotFoundException("Producto con ID " + productId + " no encontrado en el carrito");
        }
        return cartRepository.save(cart);
    }

    @Override
    @Transactional
    public void clearCart(Long userId) {
        Cart cart = getCartByUserId(userId);
        List<CartItem> items = cartItemRepository.findByCart(cart);
        cartItemRepository.deleteAll(items);
    }

    @Override
    public CartDTO convertToDTO(Cart cart) {
        List<CartItemDTO> itemDTOs = cart.getItems().stream()
                .map(item -> {
                    BigDecimal unitPrice = item.getProduct().getPrice();
                    BigDecimal subtotal = unitPrice.multiply(BigDecimal.valueOf(item.getQuantity()));

                    return new CartItemDTO(
                            item.getProduct().getId(),
                            item.getProduct().getName(),
                            item.getQuantity(),
                            unitPrice,
                            subtotal,
                            item.getProduct().getStock(),
                            item.getProduct().getImageUrl()
                    );
                }).collect(Collectors.toList());

        BigDecimal total = itemDTOs.stream()
                .map(CartItemDTO::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return new CartDTO(cart.getId(), cart.getUser().getId(), itemDTOs, total);
    }
}