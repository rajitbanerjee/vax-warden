package com.vax.warden.security;

import com.vax.warden.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthUtil {
    private final JWTUtil jwtUtil;
    private final UserService userService;

    public Long getIdFromHeader(String header) {
        String jwtToken = getTokenFromHeader(header);
        String email = jwtUtil.validateTokenAndRetrieveEmail(jwtToken);
        return userService.findIdByEmail(email);
    }

    private String getTokenFromHeader(String header) {
        return header.split("\\s+")[1];
    }
}
