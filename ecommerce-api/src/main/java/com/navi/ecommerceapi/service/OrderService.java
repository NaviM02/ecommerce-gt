package com.navi.ecommerceapi.service;

import com.navi.ecommerceapi.dto.OrderDetailReqDto;
import com.navi.ecommerceapi.dto.OrderListResDto;
import com.navi.ecommerceapi.dto.OrderReqDto;
import com.navi.ecommerceapi.dto.OrderResDto;
import com.navi.ecommerceapi.exception.EntityNotFoundException;
import com.navi.ecommerceapi.model.Order;
import com.navi.ecommerceapi.model.OrderDetail;
import com.navi.ecommerceapi.model.Product;
import com.navi.ecommerceapi.model.User;
import com.navi.ecommerceapi.repository.OrderRepository;
import com.navi.ecommerceapi.repository.ProductRepository;
import com.navi.ecommerceapi.repository.UserRepository;
import com.navi.ecommerceapi.service.mappers.OrderMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final OrderMapper orderMapper;
    private final NotificationService notificationService;

    public List<OrderListResDto> findAll() {
        return orderRepository.findAllByOrderByOrderIdAsc().stream().map(orderMapper::toListDto).collect(Collectors.toList());
    }

    public List<OrderListResDto> findAllByUserId(Long userId) {
        return orderRepository.findByUserUserIdOrderByOrderIdAsc(userId).stream().map(orderMapper::toListDto).collect(Collectors.toList());
    }

    public OrderResDto findById(Long id) {
        Order order = orderRepository.findById(id).orElse(null);
        if (order == null) throw new EntityNotFoundException("Orden no encontrada");
        return orderMapper.toDetailDto(order);
    }

    public OrderResDto save(OrderReqDto dto) {
        User user = userRepository.findById(dto.getUserId()).orElse(null);
        if (user == null) throw new EntityNotFoundException("Usuario no encontrado");
        List<OrderDetail> details = new ArrayList<>();

        for (OrderDetailReqDto itemDto : dto.getItems()) {
            Product product = productRepository.findById(itemDto.getProductId()).orElse(null);
            if (product == null) throw  new RuntimeException("Producto no encontrado");
            if (product.getStock() < itemDto.getQuantity()) throw new RuntimeException("Stock insuficiente para " + product.getName());

            OrderDetail detail = OrderDetail.builder()
                    .product(product)
                    .quantity(itemDto.getQuantity())
                    .price(product.getPrice())
                    .build();

            details.add(detail);
            product.setStock(product.getStock() - itemDto.getQuantity());
            productRepository.save(product);
        }

        Order order = Order.builder()
                .user(user)
                .status(1)
                .orderDate(LocalDateTime.now())
                .deliveryDate(LocalDate.now().plusDays(5))
                .orderDetails(details)
                .totalPrice(dto.getTotalPrice())
                .build();

        details.forEach(d -> d.setOrder(order));

        Order orderSaved = orderRepository.save(order);
        return orderMapper.toDetailDto(orderSaved);
    }

    public OrderResDto update(Long id, Order newOrder) {
        Order existing = orderRepository.findById(id).orElse(null);
        if (existing == null) throw new EntityNotFoundException("Orden no encontrada");
        existing.setStatus(newOrder.getStatus());
        existing.setDeliveryDate(newOrder.getDeliveryDate());

        Order updatedOrder = orderRepository.save(existing);
        // 2: Entregado
        if (newOrder.getStatus().equals(2)) {
            String msg = String.format(
                    "Tu pedido con numero de identificacion #%d ha sido entregado.",
                    updatedOrder.getOrderId()
            );
            notificationService.createNotification(updatedOrder.getUser(), msg, "PEDIDO");
        }

        return orderMapper.toDetailDto(updatedOrder);
    }

    public void delete(Long id) {
        orderRepository.deleteById(id);
    }
}
