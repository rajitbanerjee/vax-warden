package com.vax.warden.controller;

import com.vax.warden.model.Vaccination;
import com.vax.warden.service.VaccinationService;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
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
    private static final Logger logger = LogManager.getLogger(VaccinationController.class);

    @PostMapping("/book")
    @ResponseStatus(HttpStatus.CREATED)
    public Vaccination bookFirstDose(
            @Valid @RequestBody Vaccination vaccination, Authentication authentication) {
        String email = (String) authentication.getPrincipal();
        logger.info("Booking first dose for user: " + email);
        return vaccinationService.bookFirstDose(vaccination, email);
    }

    @PostMapping("/cancel")
    @ResponseStatus(HttpStatus.OK)
    public void cancelBooking(Authentication authentication) {
        String email = (String) authentication.getPrincipal();
        logger.info("Cancelling booking for user: " + email);
        vaccinationService.cancelBooking(email);
    }
}
