package com.equipo1.ecommerce.backend.dto;

import lombok.Data;

@Data
public class UserUpdateDTO {
    private String fullName;
    private String nationality;
    private String address;
    private String birthDate; // yyyy-MM-dd
    private String gender;    // MALE, FEMALE, OTHER
}
