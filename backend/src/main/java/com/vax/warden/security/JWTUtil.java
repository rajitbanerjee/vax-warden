package com.vax.warden.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import java.util.Date;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JWTUtil {
    @Value("${jwt_secret}")
    private String secret;

    public String generateToken(String email)
            throws IllegalArgumentException, JWTCreationException {
        return JWT.create()
                .withSubject("User")
                .withClaim("email", email)
                .withIssuedAt(new Date())
                .withIssuer("Vax Warden")
                .sign(Algorithm.HMAC256(secret));
    }

    public String validateTokenAndRetrieveEmail(String token) throws JWTVerificationException {
        JWTVerifier verifier =
                JWT.require(Algorithm.HMAC256(secret))
                        .withSubject("User")
                        .withIssuer("Vax Warden")
                        .build();
        DecodedJWT jwt = verifier.verify(token);
        return jwt.getClaim("email").asString();
    }
}
