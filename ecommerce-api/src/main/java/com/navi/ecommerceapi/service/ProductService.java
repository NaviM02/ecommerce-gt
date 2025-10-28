package com.navi.ecommerceapi.service;

import com.navi.ecommerceapi.dto.ProductDetailDto;
import com.navi.ecommerceapi.dto.ProductListDto;
import com.navi.ecommerceapi.dto.RatingResDto;
import com.navi.ecommerceapi.exception.DomainException;
import com.navi.ecommerceapi.model.Product;
import com.navi.ecommerceapi.model.User;
import com.navi.ecommerceapi.repository.CategoryRepository;
import com.navi.ecommerceapi.repository.ProductRepository;
import com.navi.ecommerceapi.exception.EntityNotFoundException;
import com.navi.ecommerceapi.repository.RatingRepository;
import com.navi.ecommerceapi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final RatingRepository ratingRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    public List<ProductListDto> findAll(Integer status) {
        List<Product> products = (status != null)
                ? productRepository.findAllByStatus(status)
                : productRepository.findAll();

        return products.stream()
                .map(p -> ProductListDto.builder()
                        .productId(p.getProductId())
                        .name(p.getName())
                        .price(p.getPrice())
                        .stock(p.getStock())
                        .categories(p.getCategories())
                        .condition(p.getCondition())
                        .status(p.getStatus())
                        .imageUrl(p.getImageUrl())
                        .averageRating(ratingRepository.findAverageByProductId(p.getProductId()))
                        .build())
                .collect(Collectors.toList());
    }

    public ProductDetailDto findById(Long id) {
        Product product = productRepository.findById(id).orElse(null);
        if (product == null) throw new EntityNotFoundException("Product not found");

        List<RatingResDto> ratingDtos = ratingRepository.findByProductProductId(product.getProductId())
                .stream()
                .map(r -> RatingResDto.builder()
                        .ratingId(r.getRatingId())
                        .stars(r.getStars())
                        .comment(r.getComment())
                        .username(r.getUser().getUsername())
                        .createdAt(r.getCreatedAt())
                        .build())
                .toList();

        return ProductDetailDto.builder()
                .productId(product.getProductId())
                .name(product.getName())
                .description(product.getDescription())
                .imageUrl(product.getImageUrl())
                .price(product.getPrice())
                .stock(product.getStock())
                .condition(product.getCondition())
                .status(product.getStatus())
                .createdAt(product.getCreatedAt())
                .categories(product.getCategories())
                .sellerName(product.getSeller().getFullName())
                .sellerId(product.getSeller().getUserId())
                .ratings(ratingDtos)
                .averageRating(ratingRepository.findAverageByProductId(product.getProductId()))
                .build();
    }

    public List<ProductListDto> findAllByUserId(Long id) {
        List<Product> products = productRepository.findBySellerUserId(id);

        return products.stream()
                .map(p -> ProductListDto.builder()
                        .productId(p.getProductId())
                        .name(p.getName())
                        .price(p.getPrice())
                        .stock(p.getStock())
                        .categories(p.getCategories())
                        .condition(p.getCondition())
                        .status(p.getStatus())
                        .imageUrl(p.getImageUrl())
                        .averageRating(ratingRepository.findAverageByProductId(p.getProductId()))
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional
    public Product save(Product product) {
        if (product.getCategories() == null || product.getCategories().isEmpty()) throw new DomainException("Product must have at least one category");
        return productRepository.save(product);
    }

    @Transactional
    public Product saveWithImage(Product product, MultipartFile image) throws IOException {
        if (image != null && !image.isEmpty()) product.setImageUrl(getImageUrl(image));
        return productRepository.save(product);
    }

    @Transactional
    public ProductDetailDto update(Long id, Product newProduct, MultipartFile image) throws IOException {
        if (!id.equals(newProduct.getProductId())) throw new DomainException("Bad product id");
        if (newProduct.getCategories() == null || newProduct.getCategories().isEmpty()) throw new DomainException("Product must have at least one category");
        if (image != null && !image.isEmpty()) newProduct.setImageUrl(getImageUrl(image));

        User seller = userRepository.findById(newProduct.getSeller().getUserId()).orElseThrow(() -> new EntityNotFoundException("Vendedor no encontrado"));

        boolean notify = false;
        String msg = "";

        if (newProduct.getStatus().equals(2)){ // Aprobado
            msg = String.format("Tu producto '%s' ha sido aprobado por el moderador", newProduct.getName());
            notify = true;
        } else if (newProduct.getStatus().equals(3)){ // Rechazado
            msg = String.format("Tu producto '%s' ha sido rechazado por el moderador", newProduct.getName());
            notify = true;
        }

        if (notify) notificationService.createNotification(seller, msg, "PRODUCTO");

        Product product = productRepository.save(newProduct);

        return ProductDetailDto.builder()
                .productId(product.getProductId())
                .name(product.getName())
                .description(product.getDescription())
                .imageUrl(product.getImageUrl())
                .price(product.getPrice())
                .stock(product.getStock())
                .condition(product.getCondition())
                .status(product.getStatus())
                .createdAt(product.getCreatedAt())
                .categories(product.getCategories())
                .sellerName(product.getSeller().getFullName())
                .sellerId(product.getSeller().getUserId())
                .build();
    }

    public void delete(Long id) {
        productRepository.deleteById(id);
    }

    private String getImageUrl(MultipartFile image) throws IOException {
        String uploadDir = "uploads/products/";
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String filename = UUID.randomUUID() + "_" + image.getOriginalFilename();
        Path filePath = uploadPath.resolve(filename);
        Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return "/" + uploadDir + filename;
    }
}
