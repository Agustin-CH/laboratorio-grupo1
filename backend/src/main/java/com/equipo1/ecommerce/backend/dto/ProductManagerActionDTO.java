package com.equipo1.ecommerce.backend.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ProductManagerActionDTO {
    private Long id;
    private Long adminId;
    private Long productId;
    private String actionType;
    private LocalDateTime timestamp;
}
