package com.equipo1.ecommerce.backend.service;

import com.equipo1.ecommerce.backend.dto.UserDTO;
import com.equipo1.ecommerce.backend.model.User;
import com.equipo1.ecommerce.backend.model.User.Role;
import com.equipo1.ecommerce.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public List<UserDTO> getAll() {
        return userRepository.findAll().stream()
                .map(UserDTO::new)           // invoca el constructor UserDTO(User)
                .collect(Collectors.toList());
    }

    @Override
    public UserDTO getById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return new UserDTO(user);
    }

    @Override
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public UserDTO updateRoles(Long userId, Set<String> roleStrings) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Set<User.Role> roles = roleStrings.stream()
                .map(String::toUpperCase)
                .map(User.Role::valueOf)
                .collect(Collectors.toSet());

        user.setRoles(roles);
        User saved = userRepository.save(user);
        return new UserDTO(saved);
    }
}
