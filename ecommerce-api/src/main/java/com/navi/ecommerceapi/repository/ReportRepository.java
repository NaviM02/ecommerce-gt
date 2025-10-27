package com.navi.ecommerceapi.repository;

import com.navi.ecommerceapi.dto.reports.*;
import com.navi.ecommerceapi.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Repository
public interface ReportRepository extends JpaRepository<Product, Long> {
    // Top 10 productos más vendidos
    @Query(value = """
        SELECT p.product_id AS productId, p.name AS productName, SUM(od.quantity) AS totalSold
        FROM order_detail od
        JOIN "order" o ON od.order_id = o.order_id
        JOIN product p ON od.product_id = p.product_id
        WHERE o.status = 2
          AND o.order_date BETWEEN :startDate AND :endDate
        GROUP BY p.product_id, p.name
        ORDER BY totalSold DESC
        LIMIT 10
    """, nativeQuery = true)
    List<TopProductDTO> topProducts(@Param("startDate") LocalDateTime start,
                                    @Param("endDate") LocalDateTime end);

    // Top 5 clientes que más ganancias generan
    @Query(value = """
        SELECT u.user_id AS userId, u.full_name AS fullName, SUM(o.total_price) AS totalSpent
        FROM "order" o
        JOIN "user" u ON o.user_id = u.user_id
        WHERE o.status = 2
          AND o.order_date BETWEEN :startDate AND :endDate
        GROUP BY u.user_id, u.full_name
        ORDER BY totalSpent DESC
        LIMIT 5
    """, nativeQuery = true)
    List<TopCustomerBySpendingDTO> topCustomersBySpending(@Param("startDate") LocalDateTime start, @Param("endDate") LocalDateTime end);

    // Top 5 clientes que más han vendido (sumando ventas de sus productos)
    @Query(value = """
        SELECT u.user_id AS userId, u.full_name AS fullName, SUM(od.price * od.quantity) AS totalEarned
        FROM order_detail od
        JOIN "order" o ON od.order_id = o.order_id
        JOIN product p ON od.product_id = p.product_id
        JOIN "user" u ON p.seller_id = u.user_id
        WHERE o.status = 2
          AND o.order_date BETWEEN :startDate AND :endDate
        GROUP BY u.user_id, u.full_name
        ORDER BY totalEarned DESC
        LIMIT 5
    """, nativeQuery = true)
    List<TopSellerDTO> topSellers(@Param("startDate") LocalDateTime start, @Param("endDate") LocalDateTime end);

    // Top 10 clientes con más pedidos
    @Query(value = """
        SELECT u.user_id AS userId, u.full_name AS fullName, COUNT(o.order_id) AS totalOrders
        FROM "order" o
        JOIN "user" u ON o.user_id = u.user_id
        WHERE o.order_date BETWEEN :startDate AND :endDate
        GROUP BY u.user_id, u.full_name
        ORDER BY totalOrders DESC
        LIMIT 10
    """, nativeQuery = true)
    List<TopCustomerByOrdersDTO> topCustomersByOrders(@Param("startDate") LocalDateTime start, @Param("endDate") LocalDateTime end);

    // Top 10 clientes que más productos tienen a la venta
    @Query(value = """
        SELECT u.user_id AS userId, u.full_name AS fullName, COUNT(p.product_id) AS totalProducts
        FROM product p
        JOIN "user" u ON p.seller_id = u.user_id
        WHERE p.status = 2
        GROUP BY u.user_id, u.full_name
        ORDER BY totalProducts DESC
        LIMIT 10
    """, nativeQuery = true)
    List<TopSellerByProductCountDTO> topSellersByProductCount();
}
