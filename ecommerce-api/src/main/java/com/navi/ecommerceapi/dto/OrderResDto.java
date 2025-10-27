package com.navi.ecommerceapi.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderResDto {
    private Long orderId;
    private LocalDateTime orderDate;
    private Integer status;
    private LocalDate deliveryDate;
    private Long userId;
    private String username;
    private List<OrderDetailResDto> details;
    private BigDecimal totalPrice;
}
