// controller/ProductManagerActionController.java
package com.equipo1.ecommerce.backend.controller;

import com.equipo1.ecommerce.backend.dto.ProductManagerActionDTO;
import com.equipo1.ecommerce.backend.service.ProductManagerActionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/manager-actions")
@RequiredArgsConstructor
public class ProductManagerActionController {

    private final ProductManagerActionService service;

    @GetMapping
    public ResponseEntity<List<ProductManagerActionDTO>> getAll() {
        return ResponseEntity.ok(service.getAllActions());
    }

    @PostMapping
    public ResponseEntity<ProductManagerActionDTO> create(@RequestBody ProductManagerActionDTO dto) {
        return ResponseEntity.ok(service.createAction(dto));
    }
}
