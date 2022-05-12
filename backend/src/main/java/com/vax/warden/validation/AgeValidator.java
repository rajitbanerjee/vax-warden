package com.vax.warden.validation;

import com.vax.warden.model.User;
import java.time.LocalDate;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class AgeValidator implements ConstraintValidator<ValidAge, LocalDate> {
    @Override
    public void initialize(ValidAge age) {}

    @Override
    public boolean isValid(LocalDate date, ConstraintValidatorContext cxt) {
        return User.getAgeInYears(date) >= 18;
    }
}
