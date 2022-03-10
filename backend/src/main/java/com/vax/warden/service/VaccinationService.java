package com.vax.warden.service;

import com.vax.warden.exception.ResourceNotFoundException;
import com.vax.warden.model.User;
import com.vax.warden.model.Vaccination;
import com.vax.warden.repository.VaccinationRepository;
import java.util.Date;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class VaccinationService {
    private final VaccinationRepository vaccinationRepository;
    private final UserService userService;

    @Transactional
    public Vaccination bookFirstDose(Vaccination vaccination, String email) {
        User user = userService.findByEmail(email);
        if (user.getVaccination() != null) {
            throw new IllegalArgumentException("User already has a vaccination record!");
        }
        return save(vaccination, user);
    }

    @Transactional(readOnly = true)
    public Vaccination getUserVaccination(String email) {
        User user = userService.findByEmail(email);
        if (user.getVaccination() == null) {
            throw new ResourceNotFoundException("User does not have a vaccination record!");
        }
        return user.getVaccination();
    }

    public Vaccination updateFirstBooking(Vaccination vaccination, Date date) {
        vaccination.setFirstAppointment(date);
        return save(vaccination);
    }

    public Vaccination updateSecondBooking(Vaccination vaccination, Date date) {
        vaccination.setSecondAppointment(date);
        return save(vaccination);
    }

    @Transactional
    public void cancelBooking(String email) {
        Vaccination vaccination = getUserVaccination(email);
        if (vaccination.getSecondAppointment() != null) {
            updateSecondBooking(vaccination, null);
        } else {
            delete(vaccination);
        }
    }

    private Vaccination save(Vaccination vaccination) {
        return vaccinationRepository.save(vaccination);
    }

    private Vaccination save(Vaccination vaccination, User user) {
        vaccinationRepository.save(vaccination);
        user.setVaccination(vaccination);
        userService.save(user);
        return vaccinationRepository.save(vaccination);
    }

    private void delete(Vaccination vaccination) {
        vaccination.getUser().setVaccination(null);
        vaccinationRepository.delete(vaccination);
        userService.save(vaccination.getUser());
    }
}
