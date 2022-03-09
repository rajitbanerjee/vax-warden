package com.vax.warden.exception;

import java.util.Date;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ErrorMessage {
    private int statusCode;
    private String statusName;
    private Date timestamp;
    private List<String> messages;
    private String description;
}
