package com.vax.warden.security;

import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.ApplicationListener;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthSuccessListener implements ApplicationListener<AuthenticationSuccessEvent> {
    private final HttpServletRequest request;
    private final LoginAttemptService loginAttemptService;
    private static final Logger logger = LogManager.getLogger(AuthSuccessListener.class);

    @Override
    public void onApplicationEvent(final AuthenticationSuccessEvent e) {
        String ip = LoginAttemptService.getClientIP(request);
        logger.info("Authentication success from IP: " + ip);
        loginAttemptService.loginSucceeded(ip);
    }
}
