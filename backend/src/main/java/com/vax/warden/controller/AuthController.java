package com.vax.warden.controller;

import com.vax.warden.model.LoginCredentials;
import com.vax.warden.model.User;
import com.vax.warden.security.JWTUtil;
import com.vax.warden.service.UserService;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;
    private final JWTUtil jwtUtil;
    private final AuthenticationManager authManager;
    private final PasswordEncoder passwordEncoder;
    private static final Logger logger = LogManager.getLogger(AuthController.class);

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public User register(@Valid @RequestBody User user) {
        String encodedPass = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPass);
        user = userService.save(user);
        String token = jwtUtil.generateToken(user.getEmail());
        user.setJwtToken(token);
        logger.info("Registered new user: " + user.getEmail());
        return user;
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public User login(@RequestBody LoginCredentials body) {
        UsernamePasswordAuthenticationToken authInputToken =
                new UsernamePasswordAuthenticationToken(body.getEmail(), body.getPassword());
        authManager.authenticate(authInputToken);
        String token = jwtUtil.generateToken(body.getEmail());
        User user = userService.findByEmail(body.getEmail());
        user.setJwtToken(token);
        logger.info("Login successful: " + user.getEmail());
        return user;
    }
}
