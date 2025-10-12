package com.navi.ecommerceapi.repository;

import com.navi.ecommerceapi.model.Sanction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SanctionRepository extends JpaRepository<Sanction, Long> {
    List<Sanction> findByUserUserId(Long userId);
}
