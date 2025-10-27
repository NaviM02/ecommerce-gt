package com.navi.ecommerceapi.dto.reports;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TopCustomerByOrdersDTO {
    private Long userId;
    private String fullName;
    private Long totalOrders;
}
