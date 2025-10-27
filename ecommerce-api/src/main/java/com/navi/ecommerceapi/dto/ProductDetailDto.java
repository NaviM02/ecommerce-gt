package com.navi.ecommerceapi.dto;

import com.navi.ecommerceapi.model.Category;
import com.navi.ecommerceapi.model.User;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDetailDto {
    private Long productId;
    private String name;
    private String description;
    private String imageUrl;
    private BigDecimal price;
    private Integer stock;
    private Integer condition;
    private Integer status;
    private LocalDateTime createdAt;
    private List<Category> categories;
    private List<RatingResDto> ratings;
    private String sellerName;
    private Long sellerId;
    private Double averageRating;
}