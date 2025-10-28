package com.navi.ecommerceapi.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class SanctionReqDto {
    private Long sanctionId;
    private Long userId;
    private Long moderatorId;
    private String reason;
    private LocalDateTime endDate;
    private String status;
}
