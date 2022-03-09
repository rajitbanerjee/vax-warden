package com.vax.warden.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.time.Instant;
import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.util.Date;

public class AgeValidator implements ConstraintValidator<ValidAge, Date> {
    @Override
    public void initialize(ValidAge age) {
    }

    @Override
    public boolean isValid(Date date, ConstraintValidatorContext cxt) {
        LocalDate now = LocalDate.now();
        LocalDate birthdayDate = Instant.ofEpochMilli(date.getTime()).atZone(ZoneId.systemDefault()).toLocalDate();
        Period period = Period.between(birthdayDate, now);
        return period.getYears() >= 18;
    }
}
