package com.vax.warden.service;

import com.vax.warden.exception.ResourceNotFoundException;
import com.vax.warden.model.User;
import com.vax.warden.model.UserRole;
import com.vax.warden.repository.UserRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private static final Logger logger = LogManager.getLogger(UserService.class);

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
                .orElseThrow(
                        () -> {
                            logger.info(errorMessage);
                            return new ResourceNotFoundException(errorMessage);
                        });
    }

    public User findById(Long id) {
        String errorMessage = "No user found with id = " + id;
        return userRepository
                .findById(id)
                .orElseThrow(
                        () -> {
                            logger.info(errorMessage);
                            return new ResourceNotFoundException(errorMessage);
                        });
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
