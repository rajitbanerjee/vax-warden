package com.vax.warden.security;

import com.vax.warden.model.User;
import com.vax.warden.service.UserService;
import java.util.Collections;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailsService
        implements org.springframework.security.core.userdetails.UserDetailsService {
    private final UserService userService;
    private final HttpServletRequest request;
    private final LoginAttemptService loginAttemptService;
    private static final Logger logger = LogManager.getLogger(UserDetailsService.class);

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        String ip = LoginAttemptService.getClientIP(request);
        if (loginAttemptService.isBlocked(ip)) {
            logger.error("Blocking attempts from: " + ip);
            throw new RuntimeException(
                    "BruteForce: Too many failed attempts, please try again later!");
        }

        User user = userService.findByEmail(email);
        return new org.springframework.security.core.userdetails.User(
                email,
                user.getPassword(),
                Collections.singletonList(
                        new SimpleGrantedAuthority(user.getUserRole().toString())));
    }
}
