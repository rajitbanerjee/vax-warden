package com.vax.warden.validation;

import com.vax.warden.service.UserService;
import java.util.regex.Pattern;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PPSNValidator implements ConstraintValidator<ValidPPSN, String> {
    private final UserService userService;

    @Override
    public void initialize(ValidPPSN ppsn) {}

    public boolean isValid(String ppsn, ConstraintValidatorContext constraintValidatorContext) {
        return ppsn != null
                && Pattern.matches("^(\\d{7})([A-Z]{1,2})$", ppsn)
                && !userService.isPPSNInUse(ppsn);
    }
}
