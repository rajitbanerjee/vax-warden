package com.vax.warden.validation;

import java.lang.annotation.*;
import javax.validation.Constraint;
import javax.validation.Payload;

@Documented
@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = {EmailValidator.class})
public @interface ValidEmail {
    String message() default "User already exists";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
