package com.navi.ecommerceapi.repository;

import com.navi.ecommerceapi.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

}
