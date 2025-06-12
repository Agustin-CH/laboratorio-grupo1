package com.equipo1.ecommerce.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
public class CartDTO {
    private Long cartId;
    private Long userId;
    private List<CartItemDTO> items;
    private BigDecimal total;
}
