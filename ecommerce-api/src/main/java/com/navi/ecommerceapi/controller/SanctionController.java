package com.navi.ecommerceapi.controller;

import com.navi.ecommerceapi.dto.*;
import com.navi.ecommerceapi.service.SanctionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sanctions")
@RequiredArgsConstructor
public class SanctionController {

    private final SanctionService sanctionService;

    @GetMapping
    public ResponseEntity<List<SanctionResDto>> findAll() {
        return ResponseEntity.ok(sanctionService.findAll());
    }

    @PostMapping
    public ResponseEntity<SanctionResDto> create(@RequestBody SanctionReqDto sanction) {
        return ResponseEntity.status(HttpStatus.CREATED).body(sanctionService.save(sanction));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        sanctionService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
