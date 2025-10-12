package com.navi.ecommerceapi.service;

import com.navi.ecommerceapi.exception.DomainException;
import com.navi.ecommerceapi.model.Product;
import com.navi.ecommerceapi.repository.ProductRepository;
import com.navi.ecommerceapi.exception.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<Product> findAll() {
        return productRepository.findAll();
    }

    public Product findById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));
    }

    public Product save(Product product) {
        return productRepository.save(product);
    }

    public Product update(Long id, Product newProduct) {
        if (!id.equals(newProduct.getProductId())) throw new DomainException("Bad product id");
        Product existing = findById(id);
        existing.setName(newProduct.getName());
        existing.setDescription(newProduct.getDescription());
        existing.setPrice(newProduct.getPrice());
        existing.setStock(newProduct.getStock());
        existing.setStatus(newProduct.getStatus());
        return productRepository.save(existing);
    }

    public void delete(Long id) {
        productRepository.deleteById(id);
    }
}
