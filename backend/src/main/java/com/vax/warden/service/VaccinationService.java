package com.vax.warden.service;

import com.vax.warden.exception.ResourceNotFoundException;
import com.vax.warden.model.User;
import com.vax.warden.model.Vaccination;
import com.vax.warden.repository.VaccinationRepository;
import java.time.temporal.ChronoUnit;
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
        if (vaccination.getFirstAppointment() == null) {
            throw new IllegalArgumentException("First appointment date needs to be provided!");
        }
        if (vaccination.getCentre() == null) {
            throw new IllegalArgumentException("Vaccination centre needs to be provided!");
        }
        return save(vaccination, user);
    }

    @Transactional(readOnly = true)
    public Vaccination getUserVaccination(String email) {
        User user = userService.findByEmail(email);
        return getVaccination(user);
    }

    @Transactional(readOnly = true)
    public Vaccination getUserVaccination(Long id) {
        User user = userService.findByID(id);
        return getVaccination(user);
    }

    @Transactional
    public Vaccination updateVaccination(Long id, Vaccination modified) {
        User user = userService.findByID(id);
        Vaccination current = getVaccination(user);
        if (current.getFirstVaccineType() == null) {
            if (modified.getFirstVaccineType() == null) {
                throw new IllegalArgumentException("First vaccine type needs to be provided!");
            }
            current.setFirstVaccineType(modified.getFirstVaccineType());
            // book second appointment
            Date secondAppointment =
                    Date.from(current.getFirstAppointment().toInstant().plus(21, ChronoUnit.DAYS));
            current.setSecondAppointment(secondAppointment);
            current.setDosesReceived(1);
        } else if (current.getSecondVaccineType() == null) {
            if (modified.getSecondVaccineType() == null) {
                throw new IllegalArgumentException("Second vaccine type needs to be provided!");
            }
            current.setSecondVaccineType(modified.getSecondVaccineType());
            current.setDosesReceived(2);
        }
        return save(current);
    }

    @Transactional
    public void cancelBooking(String email) {
        Vaccination vaccination = getUserVaccination(email);
        if (vaccination.getSecondAppointment() != null) {
            vaccination.setSecondAppointment(null);
            save(vaccination);
        } else {
            delete(vaccination);
        }
    }

    private Vaccination getVaccination(User user) {
        if (user.getVaccination() == null) {
            throw new ResourceNotFoundException("User does not have a vaccination record!");
        }
        return user.getVaccination();
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
