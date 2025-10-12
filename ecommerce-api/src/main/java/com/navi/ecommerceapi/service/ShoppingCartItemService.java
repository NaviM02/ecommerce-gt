package com.navi.ecommerceapi.service;

import com.navi.ecommerceapi.exception.EntityNotFoundException;
import com.navi.ecommerceapi.model.ShoppingCartItem;
import com.navi.ecommerceapi.repository.ShoppingCartItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ShoppingCartItemService {

    private final ShoppingCartItemRepository shoppingCartItemRepository;

    public List<ShoppingCartItem> findAll() {
        return shoppingCartItemRepository.findAll();
    }

    public ShoppingCartItem findById(Long id) {
        ShoppingCartItem shoppingCartItem = shoppingCartItemRepository.findById(id).orElse(null);
        if (shoppingCartItem == null) throw new EntityNotFoundException("Cart item not found");
        return shoppingCartItem;
    }

    public ShoppingCartItem save(ShoppingCartItem item) {
        return shoppingCartItemRepository.save(item);
    }

    public ShoppingCartItem update(Long id, ShoppingCartItem newItem) {
        ShoppingCartItem existing = findById(id);
        existing.setQuantity(newItem.getQuantity());
        return shoppingCartItemRepository.save(existing);
    }

    public void delete(Long id) {
        shoppingCartItemRepository.deleteById(id);
    }
}
