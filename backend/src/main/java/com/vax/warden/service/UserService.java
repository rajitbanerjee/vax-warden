package com.vax.warden.service;

import com.vax.warden.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public boolean isEmailInUse(String email) {
        return userRepository.findByEmail(email).isPresent();
    }
}
