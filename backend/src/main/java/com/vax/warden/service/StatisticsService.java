package com.vax.warden.service;

import com.vax.warden.exception.ResourceNotFoundException;
import com.vax.warden.model.Statistics;
import com.vax.warden.model.User;
import com.vax.warden.model.Vaccination;
import com.vax.warden.repository.VaccinationRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StatisticsService {
    private final VaccinationRepository vaccinationRepository;
    private final UserService userService;

    public Statistics aggregateAll() {
        List<Vaccination> vaccinations = vaccinationRepository.findAll();
        Statistics statistics = new Statistics();
        for (Vaccination vaccination : vaccinations) {
            User user = vaccination.getUser();
            statistics.tallyVaccination(vaccination, user);
        }
        return statistics;
    }

    public Statistics getStatisticsByEmail(String email) {
        User user = userService.findByEmail(email);
        Vaccination vaccination = user.getVaccination();
        if (vaccination == null) {
            throw new ResourceNotFoundException("No record found with email = " + email);
        }
        return new Statistics().tallyVaccination(vaccination, user);
    }
}
