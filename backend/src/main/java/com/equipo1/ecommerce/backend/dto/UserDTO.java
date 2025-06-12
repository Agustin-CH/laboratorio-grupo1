package com.equipo1.ecommerce.backend.dto;

import com.equipo1.ecommerce.backend.model.User.Role;
import lombok.Data;

import java.util.Set;

@Data
public class UserDTO {
    private Long id;
    private String email;
    private String fullName;
    private Set<Role> roles;
}
