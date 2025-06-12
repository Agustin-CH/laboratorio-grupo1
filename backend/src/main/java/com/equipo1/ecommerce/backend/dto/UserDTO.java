// src/main/java/com/equipo1/ecommerce/backend/dto/UserDTO.java
package com.equipo1.ecommerce.backend.dto;

import com.equipo1.ecommerce.backend.model.User;
import lombok.Data;

import java.util.Set;
import java.util.stream.Collectors;

@Data
public class UserDTO {
    private Long id;
    private String email;
    private String fullName;
    private Set<String> roles;

    public UserDTO(User u) {
        this.id       = u.getId();
        this.email    = u.getEmail();
        this.fullName = u.getFullName();
        this.roles    = u.getRoles().stream()
                .map(Enum::name)
                .collect(Collectors.toSet());
    }
}
