// dto/ProductCreateDTO.java (opcional, si querés uno separado para crear)
package com.equipo1.ecommerce.backend.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductCreateDTO {
    private String name;
    private String description;
    private String imageUrl;
    private BigDecimal price;
    private Integer stock;
    private Long categoryId;
}
