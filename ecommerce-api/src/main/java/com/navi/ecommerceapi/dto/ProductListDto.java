package com.navi.ecommerceapi.dto;

import com.navi.ecommerceapi.model.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class ProductListDto {
    private Long productId;
    private String name;
    private String description;
    private BigDecimal price;
    private Integer stock;
    private Integer condition;
    private Integer status;
    private List<Category> categories;
    private String imageUrl;
    private Double averageRating;
}
