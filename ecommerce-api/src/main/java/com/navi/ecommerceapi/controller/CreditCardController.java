package com.navi.ecommerceapi.controller;

import com.navi.ecommerceapi.model.CreditCard;
import com.navi.ecommerceapi.service.CreditCardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cards")
@RequiredArgsConstructor
public class CreditCardController {
    private final CreditCardService creditCardService;

    @GetMapping("/{id}")
    public ResponseEntity<List<CreditCard>> findByUserId(@PathVariable Long id) {
        return ResponseEntity.ok(creditCardService.findByUserId(id));
    }

    @PostMapping
    public ResponseEntity<CreditCard> create(@RequestBody CreditCard card) {
        return ResponseEntity.status(HttpStatus.CREATED).body(creditCardService.save(card));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        creditCardService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
