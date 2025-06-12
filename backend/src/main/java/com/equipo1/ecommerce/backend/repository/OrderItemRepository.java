package com.equipo1.ecommerce.backend.repository;

import com.equipo1.ecommerce.backend.model.OrderItem;
import com.equipo1.ecommerce.backend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    List<OrderItem> findByOrder(Order order);
}
