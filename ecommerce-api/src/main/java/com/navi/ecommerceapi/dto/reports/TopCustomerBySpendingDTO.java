package com.navi.ecommerceapi.dto.reports;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class TopCustomerBySpendingDTO {
    private Long userId;
    private String fullName;
    private BigDecimal totalSpent;
}
