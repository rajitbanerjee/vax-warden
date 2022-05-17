package com.vax.warden.security;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import javax.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;

@Service
public class LoginAttemptService {
    private final int MAX_ATTEMPTS = 3;
    private final int BLOCKING_TIME_MINUTES = 20;
    private LoadingCache<String, Integer> attemptsCache;

    public LoginAttemptService() {
        super();
        attemptsCache =
                CacheBuilder.newBuilder()
                        .expireAfterWrite(BLOCKING_TIME_MINUTES, TimeUnit.MINUTES)
                        .build(
                                new CacheLoader<String, Integer>() {
                                    public Integer load(String key) {
                                        return 0;
                                    }
                                });
    }

    public static String getClientIP(HttpServletRequest request) {
        final String xfHeader = request.getHeader("X-Forwarded-For");
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-For#syntax
        // X-Forwarded-For: <client>, <proxy1>, <proxy2>
        if (xfHeader != null) {
            return xfHeader.split(",")[0];
        }
        return request.getRemoteAddr();
    }

    public void loginSucceeded(String key) {
        attemptsCache.invalidate(key);
    }

    public void loginFailed(String key) {
        int attempts = 0;
        try {
            attempts = attemptsCache.get(key);
        } catch (ExecutionException ignored) {
        }
        attempts++;
        attemptsCache.put(key, attempts);
    }

    public boolean isBlocked(String key) {
        try {
            return attemptsCache.get(key) >= MAX_ATTEMPTS;
        } catch (ExecutionException e) {
            return false;
        }
    }
}
