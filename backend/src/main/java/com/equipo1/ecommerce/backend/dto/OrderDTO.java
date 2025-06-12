package com.equipo1.ecommerce.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
public class OrderDTO {
    private Long orderId;
    private Long userId;
    private LocalDateTime createdAt;
    private Double totalAmount;
    private String status;
    private List<OrderItemDTO> items;
}
