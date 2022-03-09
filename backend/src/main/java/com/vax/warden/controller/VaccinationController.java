package com.vax.warden.controller;

import com.vax.warden.model.Vaccination;
import com.vax.warden.service.VaccinationService;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/vaccination")
public class VaccinationController {
    private final VaccinationService vaccinationService;

    @PostMapping("/book")
    @ResponseStatus(HttpStatus.CREATED)
    public Vaccination bookFirstDose(
            @Valid @RequestBody Vaccination vaccination, Authentication authentication) {
        String email = (String) authentication.getPrincipal();
        return vaccinationService.bookFirstDose(vaccination, email);
    }

    // TODO required at all?
    @GetMapping("/user")
    @ResponseStatus(HttpStatus.OK)
    public Vaccination getUserVaccination(Authentication authentication) {
        String email = (String) authentication.getPrincipal();
        return vaccinationService.getUserVaccination(email);
    }

    @PostMapping("/cancel")
    @ResponseStatus(HttpStatus.OK)
    public void cancelBooking(Authentication authentication) {
        String email = (String) authentication.getPrincipal();
        vaccinationService.cancelBooking(email);
    }
}
