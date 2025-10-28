package com.navi.ecommerceapi.controller;

import com.navi.ecommerceapi.model.User;
import com.navi.ecommerceapi.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> findAll(
            @RequestParam(required = false) List<Long> roleIds,
            @RequestParam(required = false) Long excludeRoleId
    ) {
        if (roleIds != null && !roleIds.isEmpty()) return ResponseEntity.ok(userService.findUsersByRoles(roleIds));
        if (excludeRoleId != null) return ResponseEntity.ok(userService.findUsersExcludingRole(excludeRoleId));
        return ResponseEntity.ok(userService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> findById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.findById(id));
    }

    @PostMapping
    public ResponseEntity<User> create(@RequestBody User user) {
        User createdUser = userService.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> update(@PathVariable Long id, @RequestBody User user) {
        return ResponseEntity.ok(userService.update(id, user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/role/{roleId}")
    public ResponseEntity<List<User>> getUsersByRole(@PathVariable Long roleId) {
        return ResponseEntity.ok(userService.findUsersByRole(roleId));
    }
}
