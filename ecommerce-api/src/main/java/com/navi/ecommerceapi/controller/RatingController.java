package com.navi.ecommerceapi.controller;

import com.navi.ecommerceapi.dto.RatingReqDto;
import com.navi.ecommerceapi.dto.RatingResDto;
import com.navi.ecommerceapi.service.RatingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ratings")
@RequiredArgsConstructor
public class RatingController {
    private final RatingService ratingService;

    @PostMapping()
    public ResponseEntity<RatingResDto> addRating(@RequestBody RatingReqDto request) {
        return ResponseEntity.ok(ratingService.save(request));
    }
}
