package com.navi.ecommerceapi.controller;

import com.navi.ecommerceapi.dto.OrderListResDto;
import com.navi.ecommerceapi.dto.OrderReqDto;
import com.navi.ecommerceapi.dto.OrderResDto;
import com.navi.ecommerceapi.model.Order;
import com.navi.ecommerceapi.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @GetMapping
    public ResponseEntity<List<OrderListResDto>> findAll() {
        return ResponseEntity.ok(orderService.findAll());
    }

    @GetMapping("user-orders/{id}")
    public ResponseEntity<List<OrderListResDto>> findAllByUserId(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.findAllByUserId(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderResDto> findById(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.findById(id));
    }

    @PostMapping
    public ResponseEntity<OrderResDto> create(@RequestBody OrderReqDto order) {
        return ResponseEntity.status(HttpStatus.CREATED).body(orderService.save(order));
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderResDto> update(@PathVariable Long id, @RequestBody Order order) {
        return ResponseEntity.ok(orderService.update(id, order));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        orderService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
