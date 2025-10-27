package com.navi.ecommerceapi.dto.reports;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class TopSellerDTO {
    private Long userId;
    private String fullName;
    private BigDecimal totalEarned;
}
