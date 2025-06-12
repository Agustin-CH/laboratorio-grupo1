package com.equipo1.ecommerce.backend.service;

import com.equipo1.ecommerce.backend.dto.ProductManagerActionDTO;
import java.util.List;

public interface ProductManagerActionService {
    List<ProductManagerActionDTO> getAllActions();
    ProductManagerActionDTO createAction(ProductManagerActionDTO dto);
}
