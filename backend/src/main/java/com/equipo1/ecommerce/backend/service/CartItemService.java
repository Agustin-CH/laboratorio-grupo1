package com.equipo1.ecommerce.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.equipo1.ecommerce.backend.model.CartItem;
import com.equipo1.ecommerce.backend.model.Product;
import com.equipo1.ecommerce.backend.model.User;
import com.equipo1.ecommerce.backend.repository.CartItemRepository;
import com.equipo1.ecommerce.backend.repository.ProductRepository;
import com.equipo1.ecommerce.backend.repository.UserRepository;

@Service

public class CartItemService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productoRepository;

    @Autowired
    private UserRepository usuarioRepository;

    public List<CartItem> getCartItemsByUser(Long userId) {
        User usuario = usuarioRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return cartItemRepository.findByUsuario(usuario);
    }

    public CartItem addItemToCart(Long userId, Long productId, int cantidad) {
        User usuario = usuarioRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Product producto = productoRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        CartItem item = new CartItem();
        item.setUsuario(usuario);
        item.setProducto(producto);
        item.setCantidad(cantidad);

        return cartItemRepository.save(item);
    }

    public void removeItem(Long itemId) {
        cartItemRepository.deleteById(itemId);
    }

    public void clearCart(Long userId) {
        User usuario = usuarioRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        cartItemRepository.deleteByUsuario(usuario);
    }
        
}
