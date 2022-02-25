package com.vax.warden.exception;

import java.util.Date;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
public class ControllerExceptionHandler {
    // 404
    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    public ErrorMessage resourceNotFoundException(
            ResourceNotFoundException ex, WebRequest request) {
        return standardErrorMessage(ex, HttpStatus.NOT_FOUND, request);
    }

    // Validation
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    public ErrorMessage methodArgumentNotValidn(
            MethodArgumentNotValidException ex, WebRequest request) {
        return standardErrorMessage(ex, HttpStatus.BAD_REQUEST, request);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ErrorMessage illegalArgumentException(IllegalArgumentException ex, WebRequest request) {
        return standardErrorMessage(ex, HttpStatus.BAD_REQUEST, request);
    }

    // Spring security
    @ExceptionHandler(AuthenticationException.class)
    @ResponseStatus(value = HttpStatus.UNAUTHORIZED)
    public ErrorMessage authenticationException(AuthenticationException ex, WebRequest request) {
        return standardErrorMessage(ex, HttpStatus.UNAUTHORIZED, request);
    }

    @ExceptionHandler(SecurityException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ErrorMessage securityException(SecurityException ex, WebRequest request) {
        return standardErrorMessage(ex, HttpStatus.BAD_REQUEST, request);
    }

    // Every other exception
    @ExceptionHandler(Exception.class)
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorMessage globalExceptionHandler(Exception ex, WebRequest request) {
        return standardErrorMessage(ex, HttpStatus.INTERNAL_SERVER_ERROR, request);
    }

    private ErrorMessage standardErrorMessage(Exception ex, HttpStatus status, WebRequest request) {
        return new ErrorMessage(
                status.value(),
                status.name(),
                new Date(),
                ex.getMessage(),
                request.getDescription(false));
    }
}
