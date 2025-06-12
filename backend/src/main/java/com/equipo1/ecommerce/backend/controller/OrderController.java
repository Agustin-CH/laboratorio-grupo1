package com.equipo1.ecommerce.backend.controller;

import com.equipo1.ecommerce.backend.dto.OrderDTO;
import com.equipo1.ecommerce.backend.model.Order;
import com.equipo1.ecommerce.backend.service.OrderService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/user/{userId}")
    public List<OrderDTO> getOrdersByUser(@PathVariable Long userId) {
        return orderService.getOrdersByUserId(userId);
    }

    @PostMapping("/create/{userId}")
    public OrderDTO createOrder(@PathVariable Long userId) {
        return orderService.createOrderFromCart(userId);
    }

    @GetMapping("/{orderId}")
    public OrderDTO getOrderById(@PathVariable Long orderId) {
        return orderService.getOrderById(orderId);
    }

    @PutMapping("/{orderId}/cancel")
    public OrderDTO cancelOrder(@PathVariable Long orderId) {
        return orderService.cancelOrder(orderId);
    }
}
