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
    // 400
    @ExceptionHandler({
        MethodArgumentNotValidException.class,
        IllegalArgumentException.class,
        SecurityException.class
    })
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ErrorMessage error400(Exception ex, WebRequest request) {
        return standardErrorMessage(ex, HttpStatus.BAD_REQUEST, request);
    }

    // 401
    @ExceptionHandler(AuthenticationException.class)
    @ResponseStatus(value = HttpStatus.UNAUTHORIZED)
    public ErrorMessage error401(Exception ex, WebRequest request) {
        return standardErrorMessage(ex, HttpStatus.UNAUTHORIZED, request);
    }

    // 404
    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    public ErrorMessage error404(Exception ex, WebRequest request) {
        return standardErrorMessage(ex, HttpStatus.NOT_FOUND, request);
    }

    // 500: Every other exception
    @ExceptionHandler(Exception.class)
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorMessage error500(Exception ex, WebRequest request) {
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
