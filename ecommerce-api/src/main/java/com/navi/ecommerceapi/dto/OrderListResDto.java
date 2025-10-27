package com.navi.ecommerceapi.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@Builder
public class OrderListResDto {
    private Long orderId;
    private String username;
    private Integer status;
    private LocalDate deliveryDate;
    private BigDecimal totalPrice;
}
