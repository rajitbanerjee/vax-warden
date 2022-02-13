package com.vax.warden.service;

import com.vax.warden.exception.ResourceNotFoundException;
import com.vax.warden.model.Vaccination;
import com.vax.warden.repository.UserRepository;
import com.vax.warden.repository.VaccinationRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VaccinationService {
    private final UserRepository userRepository;
    private final VaccinationRepository vaccinationRepository;

    public Vaccination bookFirstDose(Vaccination vaccination) {
        Long userId = vaccination.getUser_id();
        String error1 = "No user found with id = " + userId;
        userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException(error1));

        String error2 = "User already has a vaccination record with id = " + userId;
        if (vaccinationRepository.findById(userId).isPresent()) {
            throw new IllegalArgumentException(error2);
        }
        vaccinationRepository.save(vaccination);
        return vaccination;
    }

    public List<Vaccination> findAll() {
        return vaccinationRepository.findAll();
    }

    public Vaccination getVaccinationById(Long id) {
        String errorMessage = "No record found with id = " + id;
        return vaccinationRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(errorMessage));
    }
}
