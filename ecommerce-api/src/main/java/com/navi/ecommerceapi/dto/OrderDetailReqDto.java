package com.navi.ecommerceapi.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailReqDto {
    private Long productId;
    private Integer quantity;
}
