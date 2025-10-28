package com.navi.ecommerceapi.repository;

import com.navi.ecommerceapi.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserUserIdOrderByOrderIdAsc(Long userId);
    List<Order> findAllByOrderByOrderIdAsc();

}