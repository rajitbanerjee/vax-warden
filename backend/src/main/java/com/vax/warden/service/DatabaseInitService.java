package com.vax.warden.service;

import static com.vax.warden.encryption.DateEncryptor.formatter;

import com.vax.warden.controller.AuthController;
import com.vax.warden.model.Gender;
import com.vax.warden.model.User;
import com.vax.warden.model.UserRole;
import java.text.ParseException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DatabaseInitService {
    private final AuthController authController;

    public void init() throws ParseException {
        // Pre-register a dummy admin user on the portal
        User admin = new User();
        admin.setFirstName("Admin");
        admin.setLastName("Ada");
        admin.setEmail("admin@ucd.ie");
        admin.setPassword("Admin!234");
        admin.setAddress("UCD, Dublin 4, Co. Dublin, Ireland");
        admin.setPhoneNo("0899123465");
        admin.setPpsn("1234512AB");
        admin.setDateOfBirth(formatter.parse("1989-02-15"));
        admin.setNationality("Ireland");
        admin.setUserRole(UserRole.ROLE_ADMIN);
        admin.setGender(Gender.FEMALE);
        authController.register(admin);
    }
}
