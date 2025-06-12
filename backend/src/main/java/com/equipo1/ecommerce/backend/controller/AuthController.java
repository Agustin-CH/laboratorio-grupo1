// src/main/java/com/equipo1/ecommerce/backend/controller/AuthController.java
package com.equipo1.ecommerce.backend.controller;

import com.equipo1.ecommerce.backend.dto.*;
import com.equipo1.ecommerce.backend.model.Cart;
import com.equipo1.ecommerce.backend.model.User;
import com.equipo1.ecommerce.backend.repository.UserRepository;
import com.equipo1.ecommerce.backend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Set;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authManager;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody RegisterRequestDTO req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        User newUser = new User();
        newUser.setEmail(req.getEmail());
        newUser.setFullName(req.getFullName());
        newUser.setPassword(passwordEncoder.encode(req.getPassword()));
        newUser.setRoles(Set.of(User.Role.USER));

        // Inicializar carrito vacío si lo usas
        Cart cart = new Cart();
        cart.setUser(newUser);
        newUser.setCart(cart);

        userRepository.save(newUser);
        return ResponseEntity
                .created(URI.create("/api/auth/register"))
                .build();
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody AuthRequestDTO req) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword())
        );

        String token = jwtUtil.generateToken(req.getEmail());
        User user = userRepository.findByEmail(req.getEmail()).orElseThrow();
        UserDTO userDTO = new UserDTO(user);

        return ResponseEntity.ok(new AuthResponseDTO(token, userDTO));
    }
}
