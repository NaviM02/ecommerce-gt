package com.navi.ecommerceapi.service;

import com.navi.ecommerceapi.exception.DomainException;
import com.navi.ecommerceapi.exception.EntityAlreadyExistsException;
import com.navi.ecommerceapi.exception.EntityNotFoundException;
import com.navi.ecommerceapi.model.User;
import com.navi.ecommerceapi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(11);

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public List<User> findUsersByRoles(List<Long> roleIds) {
        return userRepository.findByRoleRoleIdInOrderByUserIdAsc(roleIds);
    }

    public List<User> findUsersExcludingRole(Long excludedRoleId) {
        return userRepository.findByRoleRoleIdNotOrderByUserIdAsc(excludedRoleId);
    }

    public User findById(Long id) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) throw new EntityNotFoundException("User not found");
        return user;
    }

    public User save(User user) {
        User existing = userRepository.findByUsername(user.getUsername()).orElse(null);
        if (existing != null) throw new EntityAlreadyExistsException("Cambiar nombre de usuario");
        existing = userRepository.findByEmail(user.getEmail()).orElse(null);
        if (existing != null) throw new EntityAlreadyExistsException("Cambiar email");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRegistrationDate(LocalDateTime.now());
        return userRepository.save(user);
    }

    public User update(Long id, User newUser) {
        if (!id.equals(newUser.getUserId())) throw new DomainException("Bad user id");
        User existing = findById(id);
        existing.setFullName(newUser.getFullName());
        existing.setEmail(newUser.getEmail());
        existing.setPhone(newUser.getPhone());
        existing.setActive(newUser.getActive());
        existing.setRole(newUser.getRole());
        return userRepository.save(existing);
    }

    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    public User findUserByEmail(String email){
        return userRepository.findByEmail(email).orElse(null);
    }

    public List<User> findUsersByRole(Long roleId) {
        return userRepository.findByRoleRoleId(roleId);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }
}