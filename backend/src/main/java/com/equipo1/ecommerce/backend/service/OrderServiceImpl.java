package com.equipo1.ecommerce.backend.service;

import com.equipo1.ecommerce.backend.dto.OrderDTO;
import com.equipo1.ecommerce.backend.dto.OrderItemDTO;
import com.equipo1.ecommerce.backend.model.*;
import com.equipo1.ecommerce.backend.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import java.math.BigDecimal;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;

    public OrderServiceImpl(OrderRepository orderRepository,
                            CartRepository cartRepository, CartItemRepository cartItemRepository,
                            UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.userRepository = userRepository;
    }

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

        Order order = new Order();
        order.setUser(user);
        order.setCreatedAt(LocalDateTime.now());
        order.setStatus(Order.Status.PENDING);

        List<OrderItem> orderItems = cart.getItems().stream()
                .map(cartItem -> {
                    OrderItem orderItem = new OrderItem();
                    orderItem.setOrder(order);
                    orderItem.setProduct(cartItem.getProduct());
                    orderItem.setQuantity(cartItem.getQuantity());
                    return orderItem;
                })
                .collect(Collectors.toList());
        order.setItems(orderItems);

        BigDecimal totalAmount = orderItems.stream()
                .map(item ->
                        item.getProduct()
                                .getPrice()
                                .multiply(BigDecimal.valueOf(item.getQuantity()))
                )
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        order.setTotalAmount(totalAmount.doubleValue());

        Order savedOrder = orderRepository.save(order);

        // limpiar carrito
        cartItemRepository.deleteAll(cart.getItems());

        return convertToDTO(savedOrder);
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
        List<OrderItemDTO> itemDTOs = order.getItems().stream().map(item -> {
            BigDecimal unitPrice = item.getProduct().getPrice();
            BigDecimal subtotal = unitPrice.multiply(BigDecimal.valueOf(item.getQuantity()));
            return new OrderItemDTO(
                    item.getProduct().getId(),
                    item.getProduct().getName(),
                    item.getQuantity(),
                    unitPrice,
                    subtotal);
        }).collect(Collectors.toList());

        BigDecimal total = itemDTOs.stream()
                .map(OrderItemDTO::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return new OrderDTO(
                order.getId(),
                order.getUser().getId(),
                order.getCreatedAt(),
                total.doubleValue(),
                order.getStatus().name(),
                itemDTOs);
    }
}
