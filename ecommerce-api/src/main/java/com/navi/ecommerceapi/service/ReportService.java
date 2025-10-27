package com.navi.ecommerceapi.service;

import com.navi.ecommerceapi.dto.reports.*;
import com.navi.ecommerceapi.repository.ReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportService {
    private final ReportRepository reportRepository;

    // Top 10 productos más vendidos en un intervalo
    public List<TopProductDTO> getTopProducts(LocalDateTime start, LocalDateTime end) {
        return reportRepository.topProducts(start, end);
    }

    // Top 5 clientes que más ganancias generan
    public List<TopCustomerBySpendingDTO> getTopCustomersBySpending(LocalDateTime start, LocalDateTime end) {
        return reportRepository.topCustomersBySpending(start, end);
    }

    // Top 5 clientes que más han vendido
    public List<TopSellerDTO> getTopSellers(LocalDateTime start, LocalDateTime end) {
        return reportRepository.topSellers(start, end);
    }

    // Top 10 clientes con más pedidos
    public List<TopCustomerByOrdersDTO> getTopCustomersByOrders(LocalDateTime start, LocalDateTime end) {
        return reportRepository.topCustomersByOrders(start, end);
    }

    // Top 10 clientes que más productos tienen a la venta
    public List<TopSellerByProductCountDTO> getTopSellersByProductCount() {
        return reportRepository.topSellersByProductCount();
    }

}
