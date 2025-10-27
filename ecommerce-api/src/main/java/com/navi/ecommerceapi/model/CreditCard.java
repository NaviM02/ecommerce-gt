package com.navi.ecommerceapi.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "payment_method")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreditCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long creditCardId;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private String cardNumber;

    @Column(nullable = false)
    private String cardholderName;

    private LocalDate expirationDate;

    private Boolean isActive = true;
}
