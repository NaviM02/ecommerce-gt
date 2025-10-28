package com.navi.ecommerceapi.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class SanctionResDto {
    private Long sanctionId;
    private Long userId;
    private String username;
    private Long moderatorId;
    private String moderatorUsername;
    private String reason;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String status;
}
