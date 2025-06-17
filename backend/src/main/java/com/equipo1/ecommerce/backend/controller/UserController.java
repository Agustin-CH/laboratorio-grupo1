package com.equipo1.ecommerce.backend.controller;

import com.equipo1.ecommerce.backend.dto.UserDTO;
import com.equipo1.ecommerce.backend.dto.UserUpdateDTO;
import com.equipo1.ecommerce.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/roles")
    public ResponseEntity<UserDTO> updateRoles(@PathVariable Long id, @RequestBody Map<String, Set<String>> body) {
        Set<String> roles = body.get("roles");
        return ResponseEntity.ok(userService.updateRoles(id, roles));
    }

    @GetMapping("/me")
    public ResponseEntity<UserDTO> getCurrentUser(Authentication auth) {
        return ResponseEntity.ok(userService.getByEmail(auth.getName()));
    }

    @PutMapping("/me")
    public ResponseEntity<UserDTO> updateSelf(
            Authentication auth,
            @RequestBody UserUpdateDTO update
    ) {
        String email = auth.getName();
        UserDTO updated = userService.updateProfileByEmail(email, update);
        return ResponseEntity.ok(updated);
    }
}
