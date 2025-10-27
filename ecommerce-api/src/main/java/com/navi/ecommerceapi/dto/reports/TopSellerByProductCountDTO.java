package com.navi.ecommerceapi.dto.reports;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TopSellerByProductCountDTO {
    private Long userId;
    private String fullName;
    private Long totalProducts;
}
