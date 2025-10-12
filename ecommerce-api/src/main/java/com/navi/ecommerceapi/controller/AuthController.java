package com.navi.ecommerceapi.controller;

import com.navi.ecommerceapi.dto.UserCredentialDto;
import com.navi.ecommerceapi.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping
    public ResponseEntity<?> login(@RequestBody UserCredentialDto credentials) {
        String token = authService.login(credentials);
        return ResponseEntity.ok()
                .header("Authorization", "Bearer " + token)
                .body("{\"token\": \"" + token + "\"}");
    }
}
