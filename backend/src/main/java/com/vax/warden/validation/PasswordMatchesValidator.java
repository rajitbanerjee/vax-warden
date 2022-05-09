package com.vax.warden.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PasswordMatchesValidator implements ConstraintValidator<PasswordMatches, String> {
    @Override
    public void initialize(PasswordMatches passwordAgain) {}

    @Override
    public boolean isValid(String isEqual, ConstraintValidatorContext context) {
        return Boolean.valueOf(isEqual); // No native override for boolean argument
    }
}
