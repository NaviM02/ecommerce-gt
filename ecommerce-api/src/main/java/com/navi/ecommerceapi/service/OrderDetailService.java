package com.navi.ecommerceapi.service;

import com.navi.ecommerceapi.exception.EntityNotFoundException;
import com.navi.ecommerceapi.model.OrderDetail;
import com.navi.ecommerceapi.repository.OrderDetailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderDetailService {

    private final OrderDetailRepository orderDetailRepository;

    public List<OrderDetail> findAll() {
        return orderDetailRepository.findAll();
    }

    public OrderDetail findById(Long id) {
        OrderDetail orderDetail = orderDetailRepository.findById(id).orElse(null);
        if (orderDetail == null) throw new EntityNotFoundException("Order detail not found");
        return orderDetail;
    }

    public OrderDetail save(OrderDetail detail) {
        return orderDetailRepository.save(detail);
    }

    public OrderDetail update(Long id, OrderDetail newDetail) {
        OrderDetail existing = findById(id);
        existing.setQuantity(newDetail.getQuantity());
        existing.setPrice(newDetail.getPrice());
        return orderDetailRepository.save(existing);
    }

    public void delete(Long id) {
        orderDetailRepository.deleteById(id);
    }
}
