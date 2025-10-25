package com.navi.ecommerceapi.dto;

import lombok.*;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@Builder
public class RatingResDto {
    private Long ratingId;
    private Integer stars;
    private String comment;
    private String username;
    private LocalDateTime createdAt;
}
