package com.navi.ecommerceapi.service.mappers;

import com.navi.ecommerceapi.dto.OrderDetailResDto;
import com.navi.ecommerceapi.dto.OrderListResDto;
import com.navi.ecommerceapi.dto.OrderResDto;
import com.navi.ecommerceapi.model.Order;
import com.navi.ecommerceapi.model.OrderDetail;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class OrderMapper {

    public OrderListResDto toListDto(Order order) {
        return OrderListResDto.builder()
                .orderId(order.getOrderId())
                .username(order.getUser().getUsername())
                .status(order.getStatus())
                .deliveryDate(order.getDeliveryDate())
                .totalPrice(order.getTotalPrice())
                .build();
    }

    public OrderResDto toDetailDto(Order order) {
        return OrderResDto.builder()
                .orderId(order.getOrderId())
                .userId(order.getUser().getUserId())
                .username(order.getUser().getUsername())
                .status(order.getStatus())
                .orderDate(order.getOrderDate())
                .deliveryDate(order.getDeliveryDate())
                .details(order.getOrderDetails()
                        .stream()
                        .map(this::toDetailItemDto)
                        .collect(Collectors.toList()))
                .totalPrice(order.getTotalPrice())
                .build();
    }

    private OrderDetailResDto toDetailItemDto(OrderDetail detail) {
        return OrderDetailResDto.builder()
                .productId(detail.getProduct().getProductId())
                .productName(detail.getProduct().getName())
                .price(detail.getPrice())
                .quantity(detail.getQuantity())
                .build();
    }
}
