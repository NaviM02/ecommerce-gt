package com.navi.ecommerceapi.service;

import com.navi.ecommerceapi.exception.EntityNotFoundException;
import com.navi.ecommerceapi.model.CreditCard;
import com.navi.ecommerceapi.model.User;
import com.navi.ecommerceapi.repository.CreditCardRepository;
import com.navi.ecommerceapi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CreditCardService {

    private final CreditCardRepository creditCardRepository;
    private final UserRepository userRepository;


    public List<CreditCard> findByUserId(Long id) {
        return creditCardRepository.findByUserId(id);
    }

    public CreditCard save(CreditCard card) {
        User user = userRepository.findById(card.getUserId()).orElse(null);
        if (user == null) throw new EntityNotFoundException("Usuario no encontrado");
        return creditCardRepository.save(card);
    }

    public void delete(Long id) {
        creditCardRepository.deleteById(id);
    }
}