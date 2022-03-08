package com.vax.warden.service;

import com.vax.warden.exception.ResourceNotFoundException;
import com.vax.warden.model.Vaccination;
import com.vax.warden.repository.VaccinationRepository;
import com.vax.warden.security.AuthUtil;
import java.util.Date;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VaccinationService {
    private final VaccinationRepository vaccinationRepository;
    private final AuthUtil authUtil;

    public Vaccination bookFirstDose(Vaccination vaccination, String auth) {
        Long userId = authUtil.getIdFromHeader(auth);
        vaccination.setUserId(userId);
        String error = "User already has a vaccination record with id = " + userId;
        if (vaccinationRepository.findById(userId).isPresent()) {
            throw new IllegalArgumentException(error);
        }
        return save(vaccination);
    }

    public Vaccination getUserVaccination(String auth) {
        String errorMessage = "No record found for current user";
        Long id = authUtil.getIdFromHeader(auth);
        return vaccinationRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(errorMessage));
    }

    public void updateFirstBooking(Vaccination vaccination, Date date) {
        vaccination.setFirstAppointment(date);
        save(vaccination);
    }

    public void updateSecondBooking(Vaccination vaccination, Date date) {
        vaccination.setSecondAppointment(date);
        save(vaccination);
    }

    public void cancelBooking(String auth) {
        Vaccination vaccination = getUserVaccination(auth);
        if (vaccination.getSecondAppointment() != null) {
            updateSecondBooking(vaccination, null);
        } else {
            delete(vaccination);
        }
    }

    private Vaccination save(Vaccination vaccination) {
        return vaccinationRepository.save(vaccination);
    }

    private void delete(Vaccination vaccination) {
        vaccinationRepository.delete(vaccination);
    }
}
