package com.equipo1.ecommerce.backend.controller;

import com.equipo1.ecommerce.backend.dto.CartDTO;
import com.equipo1.ecommerce.backend.model.Cart;
import com.equipo1.ecommerce.backend.model.User;
import com.equipo1.ecommerce.backend.service.CartService;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.beans.factory.annotation.Autowired;

import java.math.BigDecimal;
import java.util.Collections;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
class CartControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private CartService cartService;

    private Cart sampleCart() {
        Cart cart = new Cart();
        cart.setId(1L);

        User user = new User();
        user.setId(99L);
        cart.setUser(user);

        cart.setItems(Collections.emptyList());
        return cart;
    }

    private CartDTO sampleDto() {
        return new CartDTO(
                1L,
                99L,
                Collections.emptyList(),
                BigDecimal.TEN
        );
    }


    @Test
    void getCart_returnsDto() throws Exception {
        when(cartService.getCartByUserId(99L)).thenReturn(sampleCart());
        when(cartService.convertToDTO(any())).thenReturn(sampleDto());

        mockMvc.perform(get("/api/cart/99"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.cartId").value(1))
                .andExpect(jsonPath("$.userId").value(99))
                .andExpect(jsonPath("$.total").value(10));
    }

    @Test
    void addItem_returnsUpdatedCart() throws Exception {
        when(cartService.addItemToCart(99L, 100L, 2)).thenReturn(sampleCart());
        when(cartService.convertToDTO(any())).thenReturn(sampleDto());

        mockMvc.perform(post("/api/cart/99/add/100")
                        .param("quantity", "2"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.total").value(10));
    }

    @Test
    void removeItem_returnsUpdatedCart() throws Exception {
        when(cartService.removeItemFromCart(99L, 100L)).thenReturn(sampleCart());
        when(cartService.convertToDTO(any())).thenReturn(sampleDto());

        mockMvc.perform(delete("/api/cart/99/remove/100"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.cartId").value(1));
    }

    @Test
    void clearCart_returnsNoContent() throws Exception {
        doNothing().when(cartService).clearCart(99L);

        mockMvc.perform(delete("/api/cart/99/clear"))
                .andExpect(status().isNoContent());
    }

    @TestConfiguration
    static class MockConfig {
        @Bean
        @Primary
        CartService cartService() {
            return mock(CartService.class);
        }
    }
}
