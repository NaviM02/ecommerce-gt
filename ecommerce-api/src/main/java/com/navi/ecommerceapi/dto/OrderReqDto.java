package com.navi.ecommerceapi.dto;

import java.math.BigDecimal;
import java.util.List;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderReqDto {
    private Long userId;
    private List<OrderDetailReqDto> items;
    private BigDecimal totalPrice;
}
