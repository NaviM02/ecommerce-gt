package com.navi.ecommerceapi.service;

import com.navi.ecommerceapi.exception.EntityNotFoundException;
import com.navi.ecommerceapi.model.ShoppingCart;
import com.navi.ecommerceapi.repository.ShoppingCartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ShoppingCartService {

    private final ShoppingCartRepository shoppingCartRepository;

    public List<ShoppingCart> findAll() {
        return shoppingCartRepository.findAll();
    }

    public ShoppingCart findById(Long id) {
        ShoppingCart shoppingCart = shoppingCartRepository.findById(id).orElse(null);
        if (shoppingCart == null) throw new EntityNotFoundException("Shopping cart not found");
        return shoppingCart;
    }

    public ShoppingCart save(ShoppingCart cart) {
        return shoppingCartRepository.save(cart);
    }

    public ShoppingCart update(Long id, ShoppingCart newCart) {
        ShoppingCart existing = findById(id);
        existing.setUser(newCart.getUser());
        return shoppingCartRepository.save(existing);
    }

    public void delete(Long id) {
        shoppingCartRepository.deleteById(id);
    }
}
