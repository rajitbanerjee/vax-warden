package com.vax.warden.validation;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class AgeValidator implements ConstraintValidator<ValidAge, Date> {
    @Override
    public void initialize(ValidAge age) {}

    @Override
    public boolean isValid(Date date, ConstraintValidatorContext cxt) {
        LocalDate birth = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        LocalDate now = LocalDate.now();
        long age = ChronoUnit.YEARS.between(birth, now);
        return date != null && age >= 18;
    }
}
