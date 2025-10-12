package com.navi.ecommerceapi.service;

import com.navi.ecommerceapi.exception.EntityNotFoundException;
import com.navi.ecommerceapi.model.Rating;
import com.navi.ecommerceapi.repository.RatingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RatingService {

    private final RatingRepository ratingRepository;

    public List<Rating> findAll() {
        return ratingRepository.findAll();
    }

    public Rating findById(Long id) {
        Rating rating = ratingRepository.findById(id).orElse(null);
        if (rating == null) throw new EntityNotFoundException("Rating not found");
        return rating;
    }

    public Rating save(Rating rating) {
        return ratingRepository.save(rating);
    }

    public Rating update(Long id, Rating newRating) {
        Rating existing = findById(id);
        existing.setStars(newRating.getStars());
        existing.setComment(newRating.getComment());
        return ratingRepository.save(existing);
    }

    public void delete(Long id) {
        ratingRepository.deleteById(id);
    }
}
