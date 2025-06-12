package com.equipo1.ecommerce.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthRequestDTO {
    private String email;
    private String password;
}
