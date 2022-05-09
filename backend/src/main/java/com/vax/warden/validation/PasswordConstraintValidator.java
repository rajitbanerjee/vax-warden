package com.vax.warden.validation;

import java.util.Arrays;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import org.passay.CharacterRule;
import org.passay.EnglishCharacterData;
import org.passay.LengthRule;
import org.passay.PasswordData;
import org.passay.PasswordValidator;
import org.passay.RuleResult;

public class PasswordConstraintValidator implements ConstraintValidator<ValidPassword, String> {

    @Override
    public void initialize(ValidPassword password) {}

    @Override
    public boolean isValid(String password, ConstraintValidatorContext context) {
        PasswordValidator validator =
                new PasswordValidator(
                        Arrays.asList(
                                new LengthRule(8, 64),
                                new CharacterRule(EnglishCharacterData.UpperCase, 1),
                                new CharacterRule(EnglishCharacterData.LowerCase, 1),
                                new CharacterRule(EnglishCharacterData.Digit, 1),
                                new CharacterRule(EnglishCharacterData.Special, 1)));
        RuleResult result = validator.validate(new PasswordData(password));
        return result.isValid();
    }
}
