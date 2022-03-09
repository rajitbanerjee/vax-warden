package com.vax.warden.exception;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
public class ControllerExceptionHandler {
    // 400
    @ExceptionHandler({
        IllegalArgumentException.class,
        SecurityException.class,
    })
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ErrorMessage error400(Exception ex, WebRequest request) {
        return standardErrorMessage(
                HttpStatus.BAD_REQUEST, Arrays.asList(ex.getMessage()), request);
    }

    // 400: validation errors
    @ExceptionHandler({
        MethodArgumentNotValidException.class,
    })
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ErrorMessage error400Validation(MethodArgumentNotValidException ex, WebRequest request) {
        List<ObjectError> errors = ex.getAllErrors();
        List<String> messages =
                errors.stream()
                        .map(DefaultMessageSourceResolvable::getDefaultMessage)
                        .collect(Collectors.toList());
        return standardErrorMessage(HttpStatus.BAD_REQUEST, messages, request);
    }

    // 401
    @ExceptionHandler(AuthenticationException.class)
    @ResponseStatus(value = HttpStatus.UNAUTHORIZED)
    public ErrorMessage error401(Exception ex, WebRequest request) {
        return standardErrorMessage(
                HttpStatus.UNAUTHORIZED, Arrays.asList(ex.getMessage()), request);
    }

    // 404
    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    public ErrorMessage error404(Exception ex, WebRequest request) {
        return standardErrorMessage(HttpStatus.NOT_FOUND, Arrays.asList(ex.getMessage()), request);
    }

    // 500: Every other exception
    @ExceptionHandler(Exception.class)
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorMessage error500(Exception ex, WebRequest request) {
        return standardErrorMessage(
                HttpStatus.INTERNAL_SERVER_ERROR, Arrays.asList(ex.getMessage()), request);
    }

    private ErrorMessage standardErrorMessage(
            HttpStatus status, List<String> messages, WebRequest request) {
        return new ErrorMessage(
                status.value(), status.name(), new Date(), messages, request.getDescription(false));
    }
}
