package com.navi.ecommerceapi.dto;

import lombok.*;

@Data
@AllArgsConstructor
@Builder
public class RatingReqDto {
    private Long productId;
    private Long userId;
    private Integer stars;
    private String comment;
}
