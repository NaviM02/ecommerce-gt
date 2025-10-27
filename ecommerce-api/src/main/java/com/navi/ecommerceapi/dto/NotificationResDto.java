package com.navi.ecommerceapi.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class NotificationResDto {
    private Long notificationId;
    private Long userId;
    private String username;
    private String message;
    private String type;
    private LocalDateTime createdAt;
    private Boolean wasSent;
}
