package com.navi.ecommerceapi.repository;

import com.navi.ecommerceapi.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
    List<Rating> findByProductProductId(Long productId);
}
