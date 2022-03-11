package com.vax.warden.controller;

import com.vax.warden.model.User;
import com.vax.warden.model.Vaccination;
import com.vax.warden.service.UserService;
import com.vax.warden.service.VaccinationService;
import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {
    private final UserService userService;
    private final VaccinationService vaccinationService;

    @GetMapping("/user/list")
    @ResponseStatus(HttpStatus.OK)
    public List<User> list() {
        return userService.findAllUsers();
    }

    @GetMapping("/user/vaccination/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Vaccination vaccinationStatus(@PathVariable("id") String userId) {
        try {
            Long id = Long.parseLong(userId);
            return vaccinationService.getUserVaccination(id);
        } catch (NumberFormatException ex) {
            throw new IllegalArgumentException("User ID must be a number");
        }
    }

    @PostMapping("/user/vaccination/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Vaccination updateVaccination(
            @PathVariable("id") String userId, @Valid @RequestBody Vaccination vaccination) {
        try {
            Long id = Long.parseLong(userId);
            return vaccinationService.updateVaccination(id, vaccination);
        } catch (NumberFormatException ex) {
            throw new IllegalArgumentException("User ID must be a number");
        }
    }
}
