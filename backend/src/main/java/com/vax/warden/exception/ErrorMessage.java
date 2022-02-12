package com.vax.warden.exception;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ErrorMessage {
    private int statusCode;
    private String statusName;
    private Date timestamp;
    private String message;
    private String description;
}
