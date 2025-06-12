package com.equipo1.ecommerce.backend.service;

import com.equipo1.ecommerce.backend.dto.ProductManagerActionDTO;
import com.equipo1.ecommerce.backend.model.Product;
import com.equipo1.ecommerce.backend.model.ProductManagerAction;
import com.equipo1.ecommerce.backend.model.User;
import com.equipo1.ecommerce.backend.repository.ProductManagerActionRepository;
import com.equipo1.ecommerce.backend.repository.ProductRepository;
import com.equipo1.ecommerce.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductManagerActionServiceImpl implements ProductManagerActionService {

    private final ProductManagerActionRepository repository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Override
    public List<ProductManagerActionDTO> getAllActions() {
        return repository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ProductManagerActionDTO createAction(ProductManagerActionDTO dto) {
        User admin = userRepository.findById(dto.getAdminId())
                .orElseThrow(() -> new RuntimeException("Admin not found"));
        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        ProductManagerAction action = new ProductManagerAction();
        action.setAdmin(admin);
        action.setProduct(product);
        action.setActionType(dto.getActionType());
        action.setTimestamp(LocalDateTime.now());

        return toDTO(repository.save(action));
    }

    private ProductManagerActionDTO toDTO(ProductManagerAction action) {
        ProductManagerActionDTO dto = new ProductManagerActionDTO();
        dto.setId(action.getId());
        dto.setAdminId(action.getAdmin().getId());
        dto.setProductId(action.getProduct().getId());
        dto.setActionType(action.getActionType());
        dto.setTimestamp(action.getTimestamp());
        return dto;
    }
}

