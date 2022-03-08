package com.vax.warden.service;

import com.vax.warden.exception.ResourceNotFoundException;
import com.vax.warden.model.User;
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

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findByEmail(String email) {
        String errorMessage = "No user found with email = " + email;
        return userRepository
                .findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException(errorMessage));
    }

    public Long findIdByEmail(String email) {
        return findByEmail(email).getId();
    }

    public boolean isEmailInUse(String email) {
        return userRepository.findByEmail(email).isPresent();
    }
}
