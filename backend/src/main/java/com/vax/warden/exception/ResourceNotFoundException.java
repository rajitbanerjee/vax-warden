package com.vax.warden.exception;

public class ResourceNotFoundException extends RuntimeException {
    private static final long serialVersionUID = 3L;

    public ResourceNotFoundException(String msg) {
        super(msg);
    }
}
