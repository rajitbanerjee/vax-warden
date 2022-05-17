package com.vax.warden.security;

import com.auth0.jwt.exceptions.JWTVerificationException;
import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

@Component
@RequiredArgsConstructor
public class JWTFilter extends OncePerRequestFilter {
    private final UserDetailsService userDetailsService;
    private final JWTUtil jwtUtil;

    @Autowired
    @Qualifier("handlerExceptionResolver")
    private HandlerExceptionResolver resolver;

    private static final Logger logger = LogManager.getLogger(JWTFilter.class);

    @Override
    protected void doFilterInternal(
            HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) {
        String authHeader = request.getHeader("Authorization");
        try {
            if (authHeader != null && !authHeader.isBlank() && authHeader.startsWith("Bearer ")) {
                String jwt = authHeader.substring(7);
                String email = jwtUtil.validateTokenAndRetrieveEmail(jwt);
                logger.info("Validating JWT token for: " + email);
                UserDetails userDetails = userDetailsService.loadUserByUsername(email);
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                email, userDetails.getPassword(), userDetails.getAuthorities());
                SecurityContext context = SecurityContextHolder.getContext();
                if (context.getAuthentication() == null) {
                    context.setAuthentication(authToken);
                }
            }
            filterChain.doFilter(request, response);
        } catch (JWTVerificationException e) {
            logger.error("Invalid JWT token");
            resolver.resolveException(
                    request, response, null, new SecurityException("Invalid JWT token"));
        } catch (Exception e) {
            logger.error("Unauthorized user");
            resolver.resolveException(
                    request, response, null, new BadCredentialsException("Unauthorized"));
        }
    }
}
