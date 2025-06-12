package com.equipo1.ecommerce.backend.service;

import com.equipo1.ecommerce.backend.dto.UserDTO;

import java.util.List;
import java.util.Set;

public interface UserService {
    List<UserDTO> getAll();
    UserDTO getById(Long id);
    void deleteById(Long id);
    UserDTO updateRoles(Long userId, Set<String> roles);
}
