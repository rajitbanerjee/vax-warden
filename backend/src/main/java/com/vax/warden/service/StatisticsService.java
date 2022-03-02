package com.vax.warden.service;

import com.vax.warden.exception.ResourceNotFoundException;
import com.vax.warden.model.Statistics;
import com.vax.warden.model.Vaccination;
import com.vax.warden.repository.UserRepository;
import com.vax.warden.repository.VaccinationRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StatisticsService {
    private final UserRepository userRepository;
    private final VaccinationRepository vaccinationRepository;

    public Statistics aggregateAll() {
        List<Vaccination> vaccinations = vaccinationRepository.findAll();
        Statistics statistics = new Statistics();
        for (Vaccination vaccination : vaccinations) {
            statistics.tallyVaccination(vaccination);
        }
        return statistics;
    }

    public Statistics getStatisticsById(Long id) {
        String errorMessage = "No record found with id = " + id;
        Vaccination vaccination =
                vaccinationRepository
                        .findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException(errorMessage));
        return new Statistics().tallyVaccination(vaccination);
    }

    public Statistics getStatisticsByUserId(Long id) {
        String error1 = "No user found with id = " + id;
        userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException(error1));
        String error2 = "User doesn't has a vaccination record with id = " + id;
        Vaccination vaccination =
                vaccinationRepository
                        .findById(id)
                        .orElseThrow(() -> new IllegalArgumentException(error2));
        return new Statistics().tallyVaccination(vaccination);
    }
}
