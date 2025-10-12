package com.navi.ecommerceapi.service;

import com.navi.ecommerceapi.model.Role;
import com.navi.ecommerceapi.repository.RoleRepository;
import com.navi.ecommerceapi.exception.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoleService {

    private final RoleRepository roleRepository;

    public List<Role> findAll() {
        return roleRepository.findAll();
    }

    public Role findById(Long id) {
        Role role =  roleRepository.findById(id).orElse(null);
        if(role == null) throw new EntityNotFoundException("Role Not Found");
        return role;
    }

    public Role save(Role role) {
        return roleRepository.save(role);
    }

    public Role update(Long id, Role newRole) {
        Role existing = findById(id);
        existing.setRoleName(newRole.getRoleName());
        return roleRepository.save(existing);
    }

    public void delete(Long id) {
        roleRepository.deleteById(id);
    }
}
