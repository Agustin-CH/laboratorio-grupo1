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
    private String nationality;
    private String address;
    private String birthDate;
    private String gender;
    private Set<String> roles;

    public UserDTO(User u) {
        this.id          = u.getId();
        this.email       = u.getEmail();
        this.fullName    = u.getFullName();
        this.nationality = u.getNationality();
        this.address     = u.getAddress();
        this.birthDate   = u.getBirthDate() != null ? u.getBirthDate().toString() : null;
        this.gender      = u.getGender() != null ? u.getGender().name() : null;
        this.roles       = u.getRoles().stream()
                .map(Enum::name)
                .collect(Collectors.toSet());
    }
}

