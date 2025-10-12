package com.navi.ecommerceapi.repository;

import com.navi.ecommerceapi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByRoleRoleId(Long roleId);
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);

}
