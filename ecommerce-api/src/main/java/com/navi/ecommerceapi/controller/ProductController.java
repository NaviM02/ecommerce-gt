package com.navi.ecommerceapi.controller;

import com.navi.ecommerceapi.dto.ProductDetailDto;
import com.navi.ecommerceapi.dto.ProductListDto;
import com.navi.ecommerceapi.model.Product;
import com.navi.ecommerceapi.service.NotificationService;
import com.navi.ecommerceapi.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<List<ProductListDto>> findAll(@RequestParam(required = false) Integer status) {
        return ResponseEntity.ok(productService.findAll(status));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDetailDto> findById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.findById(id));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ProductListDto>> findByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(productService.findAllByUserId(userId));
    }

    @PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<Product> create(
            @RequestPart("product") Product product,
            @RequestPart(value = "image", required = false) MultipartFile image) throws IOException {

        Product saved = productService.saveWithImage(product, image);
        return ResponseEntity.ok(saved);
    }

    @PutMapping(value ="/{id}", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<Product> update(
            @PathVariable Long id,
            @RequestPart("product") Product product,
            @RequestPart(value = "image", required = false) MultipartFile image) throws IOException {
        return ResponseEntity.ok(productService.update(id, product, image));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }
    private final NotificationService notificationService;

    @GetMapping("emails")
    public ResponseEntity<Void> findByEmail() {
        notificationService.sendMail();
        return ResponseEntity.ok().build();
    }
}
