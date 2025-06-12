package com.equipo1.ecommerce.backend.service;

import com.equipo1.ecommerce.backend.dto.OrderDTO;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface OrderService {

    List<OrderDTO> getOrdersByUserId(Long userId);

    @Transactional
    OrderDTO createOrderFromCart(Long userId);

    OrderDTO getOrderById(Long orderId);

    @Transactional
    OrderDTO cancelOrder(Long orderId);
}

