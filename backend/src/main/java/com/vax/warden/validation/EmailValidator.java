package com.vax.warden.validation;

import com.vax.warden.service.UserService;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EmailValidator implements ConstraintValidator<ValidEmail, String> {
    private final UserService userService;

    @Override
    public void initialize(ValidEmail email) {}

    public boolean isValid(String email, ConstraintValidatorContext constraintValidatorContext) {
        return email != null && !userService.isEmailInUse(email);
    }
}
