package com.navi.ecommerceapi.dto;

import java.time.LocalDateTime;

public class SanctionResDto {
    private Long sanctionId;
    private Long userId;
    private String username;
    private Long moderatorId;
    private String moderatorName;
    private String reason;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String status;
}
