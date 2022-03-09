package com.vax.warden.validation;

import com.vax.warden.model.User;
import java.util.Date;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class AgeValidator implements ConstraintValidator<ValidAge, Date> {
    @Override
    public void initialize(ValidAge age) {}

    @Override
    public boolean isValid(Date date, ConstraintValidatorContext cxt) {
        return User.getAgeInYears(date) >= 18;
    }
}
