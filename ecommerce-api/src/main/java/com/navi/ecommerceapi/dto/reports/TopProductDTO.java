package com.navi.ecommerceapi.dto.reports;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TopProductDTO {
    private Long productId;
    private String productName;
    private Long totalSold;
}
