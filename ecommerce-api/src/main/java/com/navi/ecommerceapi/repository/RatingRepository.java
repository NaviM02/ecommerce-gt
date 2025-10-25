package com.navi.ecommerceapi.repository;

import com.navi.ecommerceapi.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
    List<Rating> findByProductProductId(Long productId);

    @Query("SELECT COALESCE(AVG(r.stars), 0) FROM Rating r WHERE r.product.productId = :productId")
    Double findAverageByProductId(@Param("productId") Long productId);
}
