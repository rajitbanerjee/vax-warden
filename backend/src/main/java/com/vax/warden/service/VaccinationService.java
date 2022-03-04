package com.vax.warden.service;

import com.vax.warden.exception.ResourceNotFoundException;
import com.vax.warden.model.Vaccination;
import com.vax.warden.repository.UserRepository;
import com.vax.warden.repository.VaccinationRepository;
import java.util.Date;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VaccinationService {
    private final UserRepository userRepository;
    private final VaccinationRepository vaccinationRepository;

    public Vaccination save(Vaccination vaccination) {
        return vaccinationRepository.save(vaccination);
    }

    public void delete(Vaccination vaccination) {
        vaccinationRepository.delete(vaccination);
    }

    public void updateFirstBooking(Vaccination vaccination, Date date) {
        vaccination.setFirstAppointment(date);
        save(vaccination);
    }

    public void updateSecondBooking(Vaccination vaccination, Date date) {
        vaccination.setSecondAppointment(date);
        save(vaccination);
    }

    public void cancelBooking(Long id) {
        Vaccination vaccination = getVaccinationById(id);
        if (vaccination.getSecondAppointment() != null) {
            updateSecondBooking(vaccination, null);
        } else {
            delete(vaccination);
        }
    }

    public Vaccination bookFirstDose(Vaccination vaccination) {
        Long userId = vaccination.getUserId();
        String error1 = "No user found with id = " + userId;
        userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException(error1));

        String error2 = "User already has a vaccination record with id = " + userId;
        if (vaccinationRepository.findById(userId).isPresent()) {
            throw new IllegalArgumentException(error2);
        }
        save(vaccination);
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
