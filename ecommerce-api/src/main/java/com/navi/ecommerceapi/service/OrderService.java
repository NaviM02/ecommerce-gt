package com.navi.ecommerceapi.service;

import com.navi.ecommerceapi.exception.EntityNotFoundException;
import com.navi.ecommerceapi.model.Order;
import com.navi.ecommerceapi.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;

    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    public Order findById(Long id) {
        Order order = orderRepository.findById(id).orElse(null);
        if (order == null) throw new EntityNotFoundException("Order not found");
        return order;
    }

    public Order save(Order order) {
        return orderRepository.save(order);
    }

    public Order update(Long id, Order newOrder) {
        Order existing = findById(id);
        existing.setStatus(newOrder.getStatus());
        existing.setDeliveryDate(newOrder.getDeliveryDate());
        return orderRepository.save(existing);
    }

    public void delete(Long id) {
        orderRepository.deleteById(id);
    }
}
