package com.navi.ecommerceapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;

    public boolean sendEmail(String to, String subject, String text) {
        try {
            SimpleMailMessage email = new SimpleMailMessage();
            email.setTo(to);
            email.setSubject(subject);
            email.setText(text);
            mailSender.send(email);
            return true;
        } catch (Exception e) {
            System.err.println("Error enviando correo a " + to + ": " + e.getMessage());
            return false;
        }
    }

    public void sendTestEmail() {
        sendEmail("donavintzunun201930708@cunoc.edu.gt", "Notificación de la plataforma", "Mensaje de prueba");
    }
}
