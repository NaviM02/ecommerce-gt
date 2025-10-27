package com.navi.ecommerceapi.controller;

import com.navi.ecommerceapi.dto.reports.*;
import com.navi.ecommerceapi.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {
    private final ReportService reportService;

    // --- Top 10 productos más vendidos ---
    @GetMapping("/top-products")
    public List<TopProductDTO> getTopProducts(
            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate
    ) {
        return reportService.getTopProducts(startDate, endDate);
    }

    // --- Top 5 clientes que más ganancias generan ---
    @GetMapping("/top-customers-spending")
    public List<TopCustomerBySpendingDTO> getTopCustomersBySpending(
            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate
    ) {
        return reportService.getTopCustomersBySpending(startDate, endDate);
    }

    // --- Top 5 clientes que más han vendido ---
    @GetMapping("/top-sellers")
    public List<TopSellerDTO> getTopSellers(
            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate
    ) {
        return reportService.getTopSellers(startDate, endDate);
    }

    // --- Top 10 clientes con más pedidos ---
    @GetMapping("/top-customers-orders")
    public List<TopCustomerByOrdersDTO> getTopCustomersByOrders(
            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate
    ) {
        return reportService.getTopCustomersByOrders(startDate, endDate);
    }

    // --- Top 10 clientes que más productos tienen a la venta ---
    @GetMapping("/top-sellers-products")
    public List<TopSellerByProductCountDTO> getTopSellersByProductCount() {
        return reportService.getTopSellersByProductCount();
    }
}
