package com.navi.ecommerceapi.service;

import com.navi.ecommerceapi.dto.RatingReqDto;
import com.navi.ecommerceapi.dto.RatingResDto;
import com.navi.ecommerceapi.exception.EntityNotFoundException;
import com.navi.ecommerceapi.model.Product;
import com.navi.ecommerceapi.model.Rating;
import com.navi.ecommerceapi.model.User;
import com.navi.ecommerceapi.repository.ProductRepository;
import com.navi.ecommerceapi.repository.RatingRepository;
import com.navi.ecommerceapi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RatingService {

    private final RatingRepository ratingRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public List<Rating> findAll() {
        return ratingRepository.findAll();
    }

    @Transactional(readOnly = true)
    public RatingResDto findById(Long id) {
        Rating rating = ratingRepository.findById(id).orElse(null);
        if (rating == null) throw new EntityNotFoundException("Rating not found");
        return toResDto(rating);
    }

    public RatingResDto save(RatingReqDto dto) {
        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Rating rating = Rating.builder()
                .product(product)
                .user(user)
                .stars(dto.getStars())
                .comment(dto.getComment())
                .build();

        Rating saved = ratingRepository.save(rating);
        return toResDto(saved);
    }

    public Rating update(Long id, Rating newRating) {
        Rating existing = ratingRepository.findById(id).orElse(null);
        existing.setStars(newRating.getStars());
        existing.setComment(newRating.getComment());
        return ratingRepository.save(existing);
    }

    public void delete(Long id) {
        ratingRepository.deleteById(id);
    }

    private RatingResDto toResDto(Rating rating) {
        return RatingResDto.builder()
                .ratingId(rating.getRatingId())
                .stars(rating.getStars())
                .comment(rating.getComment())
                .username(rating.getUser().getUsername())
                .createdAt(rating.getCreatedAt())
                .build();
    }
}
