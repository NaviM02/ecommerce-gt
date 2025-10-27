package com.navi.ecommerceapi.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
public class OrderDetailResDto {
    private Long productId;
    private String productName;
    private Integer quantity;
    private BigDecimal price;
}
