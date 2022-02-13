package com.vax.warden.controller;

import com.vax.warden.model.Vaccination;
import com.vax.warden.service.VaccinationService;
import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
    public Vaccination bookFirstDose(@Valid @RequestBody Vaccination vaccination) {
        return vaccinationService.bookFirstDose(vaccination);
    }

    @GetMapping("/list")
    @ResponseStatus(HttpStatus.OK)
    public List<Vaccination> list() {
        return vaccinationService.findAll();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Vaccination getVaccinationById(@PathVariable long id) {
        return vaccinationService.getVaccinationById(id);
    }
}
