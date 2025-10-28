package com.navi.ecommerceapi.service;

import com.navi.ecommerceapi.dto.UserCredentialDto;
import com.navi.ecommerceapi.exception.DomainException;
import com.navi.ecommerceapi.exception.InvalidCredentialsException;
import com.navi.ecommerceapi.model.Sanction;
import com.navi.ecommerceapi.model.User;
import com.navi.ecommerceapi.repository.SanctionRepository;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Service
public class AuthService {
    private final UserService userService;
    private final SanctionRepository sanctionRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(11);
    private final SecretKey key = Keys.hmacShaKeyFor("mysecretkeymysecretkeymysecretkey12".getBytes());

    public AuthService(UserService userService,  SanctionRepository sanctionRepository) {
        this.userService = userService;
        this.sanctionRepository = sanctionRepository;
    }

    public String login(UserCredentialDto credentials) {
        User user = userService.findByUsername(credentials.getUsername());
        if (user == null) user = userService.findUserByEmail(credentials.getUsername());
        if (user == null) throw new InvalidCredentialsException("wrong_credentials");
        if (!user.getActive()) throw new DomainException("inactive_user");
        if (!passwordEncoder.matches(credentials.getPassword(), user.getPassword())) throw new InvalidCredentialsException("wrong_credentials");
        if (isUserSanctioned(user)) throw new DomainException("user_sanctioned");

        long expirationMs = 24 * 60 * 60 * 1000;
        return Jwts.builder()
                .subject(user.getUsername())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expirationMs))
                .claim("userId", user.getUserId())
                .claim("role", user.getRole().getRoleId())
                .signWith(key)
                .compact();
    }

    private boolean isUserSanctioned(User user) {
        List<Sanction> sanctions = sanctionRepository.findByUserUserId(user.getUserId());
        LocalDateTime now = LocalDateTime.now();

        return sanctions.stream().anyMatch(s -> s.getEndDate() != null && !s.getEndDate().isBefore(now));
    }

    public Jws<Claims> verifyToken(String token) {
        try {
            return Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token);
        } catch (JwtException e) {
            return null;
        }
    }
}
