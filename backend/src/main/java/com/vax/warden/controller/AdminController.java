package com.vax.warden.controller;

import com.vax.warden.model.User;
import com.vax.warden.model.Vaccination;
import com.vax.warden.service.UserService;
import com.vax.warden.service.VaccinationService;
import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {
    private final UserService userService;
    private final VaccinationService vaccinationService;
    private static final Logger logger = LogManager.getLogger(AdminController.class);

    @GetMapping("/user/list")
    @ResponseStatus(HttpStatus.OK)
    public List<User> list() {
        logger.info("Returning list of all users");
        return userService.findAllUsers();
    }

    @PostMapping("/user/vaccination/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Vaccination updateVaccination(
            @PathVariable("id") String userId, @Valid @RequestBody Vaccination vaccination) {
        try {
            Long id = Long.parseLong(userId);
            return vaccinationService.updateVaccination(id, vaccination);
        } catch (NumberFormatException ex) {
            String message = "User ID must be a number";
            logger.error(message);
            throw new IllegalArgumentException(message);
        }
    }
}
