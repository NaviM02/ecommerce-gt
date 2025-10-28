package com.navi.ecommerceapi.service;

import com.navi.ecommerceapi.dto.SanctionReqDto;
import com.navi.ecommerceapi.dto.SanctionResDto;
import com.navi.ecommerceapi.exception.EntityNotFoundException;
import com.navi.ecommerceapi.model.Sanction;
import com.navi.ecommerceapi.model.User;
import com.navi.ecommerceapi.repository.SanctionRepository;
import com.navi.ecommerceapi.repository.UserRepository;
import com.navi.ecommerceapi.service.mappers.SanctionMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SanctionService {

    private final SanctionRepository sanctionRepository;
    private final UserRepository userRepository;
    private final SanctionMapper sanctionMapper;
    private final EmailService emailService;

    public List<SanctionResDto> findAll() {
        return sanctionRepository.findAll().stream().map(sanctionMapper::toSanctionDto).collect(Collectors.toList());
    }

    public SanctionResDto findById(Long id) {
        Sanction sanction = sanctionRepository.findById(id).orElse(null);
        if (sanction == null) throw new EntityNotFoundException("Sanction not found");

        return sanctionMapper.toSanctionDto(sanction);
    }

    public SanctionResDto save(SanctionReqDto dto) {
        User user = userRepository.findById(dto.getUserId()).orElse(null);
        User moderator = userRepository.findById(dto.getModeratorId()).orElse(null);
        if (user == null) throw new EntityNotFoundException("Usuario no encontrados");
        if (moderator == null) throw new EntityNotFoundException("Moderador no encontrados");

        Sanction sanction = Sanction.builder()
                .user(user)
                .moderator(moderator)
                .reason(dto.getReason())
                .startDate(LocalDateTime.now())
                .endDate(dto.getEndDate())
                .status("Activa")
                .build();

        String message = "Se te ha baneado de la aplicación ya por la siguiente razon:\n" + dto.getReason() + "\nEsperamos que estos días recapacites en lo que hace hecho.";

        Sanction sanctionSaved = sanctionRepository.save(sanction);
        emailService.sendEmail(user.getEmail(), "Notificación de la plataforma: Banneado", message);
        return sanctionMapper.toSanctionDto(sanctionSaved);
    }

    public void delete(Long id) {
        sanctionRepository.deleteById(id);
    }
}