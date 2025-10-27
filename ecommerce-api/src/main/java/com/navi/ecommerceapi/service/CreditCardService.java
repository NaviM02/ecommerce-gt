package com.navi.ecommerceapi.service;

import com.navi.ecommerceapi.exception.EntityNotFoundException;
import com.navi.ecommerceapi.model.PaymentMethod;
import com.navi.ecommerceapi.repository.PaymentMethodRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentMethodService {

    private final PaymentMethodRepository paymentMethodRepository;

    public List<PaymentMethod> findAll() {
        return paymentMethodRepository.findAll();
    }

    public PaymentMethod findById(Long id) {
        PaymentMethod paymentMethod = paymentMethodRepository.findById(id).orElse(null);
        if (paymentMethod == null) throw new EntityNotFoundException("Payment method not found");
        return paymentMethod;
    }

    public PaymentMethod save(PaymentMethod method) {
        return paymentMethodRepository.save(method);
    }

    public PaymentMethod update(Long id, PaymentMethod newMethod) {
        PaymentMethod existing = findById(id);
        existing.setCardNumber(newMethod.getCardNumber());
        existing.setCardholderName(newMethod.getCardholderName());
        existing.setExpirationDate(newMethod.getExpirationDate());
        existing.setIsActive(newMethod.getIsActive());
        return paymentMethodRepository.save(existing);
    }

    public void delete(Long id) {
        paymentMethodRepository.deleteById(id);
    }
}