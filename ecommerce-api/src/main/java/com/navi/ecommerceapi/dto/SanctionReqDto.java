package com.navi.ecommerceapi.dto;

import java.time.LocalDateTime;

public class SanctionReqDto {
    private Long sanctionId;
    private Long userId;
    private Long moderatorId;
    private String reason;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String status;
}
