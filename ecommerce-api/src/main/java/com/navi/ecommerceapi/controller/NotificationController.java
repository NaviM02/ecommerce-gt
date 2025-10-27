package com.navi.ecommerceapi.controller;

import com.navi.ecommerceapi.dto.NotificationResDto;
import com.navi.ecommerceapi.model.Notification;
import com.navi.ecommerceapi.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping
    public ResponseEntity<List<NotificationResDto>> findAll() {
        return ResponseEntity.ok(notificationService.findAll());
    }
}
