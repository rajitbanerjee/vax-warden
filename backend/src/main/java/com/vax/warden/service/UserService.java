package com.vax.warden.service;

import com.vax.warden.exception.ResourceNotFoundException;
import com.vax.warden.model.User;
import com.vax.warden.model.UserRole;
import com.vax.warden.repository.UserRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User save(User user) {
        return userRepository.save(user);
    }

    public List<User> findAllUsers() {
        return userRepository.findAllByUserRole(UserRole.ROLE_USER);
    }

    public User findByEmail(String email) {
        String errorMessage = "No user found with email = " + email;
        return userRepository
                .findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException(errorMessage));
    }

    public User findById(Long id) {
        String errorMessage = "No user found with id = " + id;
        return userRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(errorMessage));
    }

    public Long findIdByEmail(String email) {
        return findByEmail(email).getId();
    }

    public boolean isEmailInUse(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    public boolean isPPSNInUse(String ppsn) {
        return userRepository.findByPpsn(ppsn).isPresent();
    }
}
