package com.equipo1.ecommerce.backend.service;

import com.equipo1.ecommerce.backend.dto.OrderDTO;
import com.equipo1.ecommerce.backend.dto.OrderItemDTO;
import com.equipo1.ecommerce.backend.model.*;
import com.equipo1.ecommerce.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Override
    public List<OrderDTO> getOrdersByUserId(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return orderRepository.findByUser(user).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public OrderDTO createOrderFromCart(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        Cart cart = cartRepository.findByUser(user).orElseThrow();

        // 1) Validar y descontar stock
        cart.getItems().forEach(ci -> {
            Product p = productRepository.findById(ci.getProduct().getId()).orElseThrow();
            if (p.getStock() < ci.getQuantity()) {
                throw new RuntimeException("Sin stock suficiente para " + p.getName());
            }
            p.setStock(p.getStock() - ci.getQuantity());
            productRepository.save(p);
        });

        Order order = new Order();
        order.setUser(user);
        order.setCreatedAt(LocalDateTime.now());
        order.setStatus(Order.Status.PENDING);

        List<OrderItem> orderItems = cart.getItems().stream().map(ci -> {
            OrderItem oi = new OrderItem();
            oi.setOrder(order);
            oi.setProduct(ci.getProduct());
            oi.setQuantity(ci.getQuantity());
            oi.setPriceUnit(ci.getProduct().getPrice());
            return oi;
        }).collect(Collectors.toList());
        order.setItems(orderItems);

        // 3) Calcular total
        BigDecimal total = orderItems.stream()
                .map(item ->
                        item.getPriceUnit()
                                .multiply(BigDecimal.valueOf(item.getQuantity()))
                )
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        order.setTotalAmount(total.doubleValue());

        Order saved = orderRepository.save(order);

        // 4) Limpiar carrito
        cartItemRepository.deleteAll(cart.getItems());

        return convertToDTO(saved);
    }

    @Override
    public OrderDTO getOrderById(Long orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow();
        return convertToDTO(order);
    }

    @Override
    @Transactional
    public OrderDTO cancelOrder(Long orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow();
        order.setStatus(Order.Status.CANCELLED);
        Order cancelled = orderRepository.save(order);
        return convertToDTO(cancelled);
    }

    private OrderDTO convertToDTO(Order order) {
        List<OrderItemDTO> items = order.getItems().stream()
                .map(item -> {
                    BigDecimal subtotal = item.getPriceUnit()
                            .multiply(BigDecimal.valueOf(item.getQuantity()));
                    return new OrderItemDTO(
                            item.getProduct().getId(),
                            item.getProduct().getName(),
                            item.getQuantity(),
                            item.getPriceUnit(),
                            subtotal
                    );
                }).collect(Collectors.toList());

        BigDecimal total = items.stream()
                .map(OrderItemDTO::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return new OrderDTO(
                order.getId(),
                order.getUser().getId(),
                order.getCreatedAt(),
                total.doubleValue(),
                order.getStatus().name(),
                items
        );
    }
}
