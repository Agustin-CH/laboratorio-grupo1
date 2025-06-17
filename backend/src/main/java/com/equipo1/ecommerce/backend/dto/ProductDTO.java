// src/main/java/com/equipo1/ecommerce/backend/dto/ProductDTO.java
package com.equipo1.ecommerce.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductDTO {
    private Long id;
    private String name;
    private String description;
    private String imageUrl;
    private BigDecimal price;
    private Integer stock;

    @JsonProperty("category")
    private String categoryName;
}
