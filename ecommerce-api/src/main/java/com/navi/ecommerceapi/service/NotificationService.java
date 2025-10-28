package com.navi.ecommerceapi.service;

import com.navi.ecommerceapi.dto.NotificationResDto;
import com.navi.ecommerceapi.model.Notification;
import com.navi.ecommerceapi.model.User;
import com.navi.ecommerceapi.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final EmailService emailService;

    public void createNotification(User user, String message, String type) {
        Notification notification = Notification.builder()
                .user(user)
                .message(message)
                .type(type)
                .createdAt(LocalDateTime.now())
                .wasSent(false)
                .build();

        boolean sent = emailService.sendEmail(user.getEmail(), "Notificación de la plataforma: " + type, message);
        if (sent) notification.setWasSent(true);

        notificationRepository.save(notification);
    }

    public List<NotificationResDto> findAll() {
        List<Notification> notifications = notificationRepository.findAll();

        return notifications.stream()
                .map(n -> NotificationResDto.builder()
                        .notificationId(n.getNotificationId())
                        .userId(n.getUser().getUserId())
                        .username(n.getUser().getUsername())
                        .message(n.getMessage())
                        .type(n.getType())
                        .createdAt(n.getCreatedAt())
                        .wasSent(n.getWasSent())
                        .build()
                ).collect(Collectors.toList());
    }
}
