package com.navi.ecommerceapi.service;

import com.navi.ecommerceapi.exception.EntityNotFoundException;
import com.navi.ecommerceapi.model.Notification;
import com.navi.ecommerceapi.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public List<Notification> findAll() {
        return notificationRepository.findAll();
    }

    public Notification findById(Long id) {
        Notification notification = notificationRepository.findById(id).orElse(null);
        if (notification == null) throw new EntityNotFoundException("Notification not found");
        return notification;
    }

    public Notification save(Notification notification) {
        return notificationRepository.save(notification);
    }

    public Notification update(Long id, Notification newNotification) {
        Notification existing = findById(id);
        existing.setMessage(newNotification.getMessage());
        existing.setType(newNotification.getType());
        existing.setWasSent(newNotification.getWasSent());
        return notificationRepository.save(existing);
    }

    public void delete(Long id) {
        notificationRepository.deleteById(id);
    }
}
