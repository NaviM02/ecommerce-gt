package com.navi.ecommerceapi.service;

import com.navi.ecommerceapi.exception.EntityNotFoundException;
import com.navi.ecommerceapi.model.Sanction;
import com.navi.ecommerceapi.repository.SanctionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SanctionService {

    private final SanctionRepository sanctionRepository;

    public List<Sanction> findAll() {
        return sanctionRepository.findAll();
    }

    public Sanction findById(Long id) {
        Sanction sanction = sanctionRepository.findById(id).orElse(null);
        if (sanction == null) throw new EntityNotFoundException("Sanction not found");
        return sanction;
    }

    public Sanction save(Sanction sanction) {
        return sanctionRepository.save(sanction);
    }

    public Sanction update(Long id, Sanction newSanction) {
        Sanction existing = findById(id);
        existing.setReason(newSanction.getReason());
        existing.setEndDate(newSanction.getEndDate());
        existing.setStatus(newSanction.getStatus());
        return sanctionRepository.save(existing);
    }

    public void delete(Long id) {
        sanctionRepository.deleteById(id);
    }
}