package com.vax.warden.service;

import com.vax.warden.model.User;
import com.vax.warden.model.Vaccination;
import com.vax.warden.repository.VaccinationRepository;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class VaccinationService {
    private final VaccinationRepository vaccinationRepository;
    private final UserService userService;
    private static final Logger logger = LogManager.getLogger(VaccinationService.class);

    @Transactional
    public Vaccination bookFirstDose(Vaccination vaccination, String email) {
        User user = userService.findByEmail(email);
        if (user.getVaccination() != null) {
            String errorMessage = email + " already has a vaccination record";
            logger.error(errorMessage);
            throw new IllegalArgumentException(errorMessage);
        }
        if (vaccination.getFirstAppointment() == null) {
            String errorMessage = "First appointment date needs to be provided: " + email;
            logger.error(errorMessage);
            throw new IllegalArgumentException(errorMessage);
        }
        if (vaccination.getCentre() == null) {
            String errorMessage = "Vaccination centre needs to be provided: " + email;
            logger.error(errorMessage);
            throw new IllegalArgumentException(errorMessage);
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
        User user = userService.findById(id);
        return getVaccination(user);
    }

    @Transactional
    public Vaccination updateVaccination(Long id, Vaccination modified) {
        User user = userService.findById(id);
        Vaccination current = getVaccination(user);
        if (current.getFirstVaccineType() == null) {
            if (modified.getFirstVaccineType() == null) {
                String errorMessage = "First vaccine type needs to be provided: " + user.getEmail();
                logger.error(errorMessage);
                throw new IllegalArgumentException(errorMessage);
            }
            current.setFirstVaccineType(modified.getFirstVaccineType());
            // book second appointment
            Date secondAppointment =
                    Date.from(current.getFirstAppointment().toInstant().plus(21, ChronoUnit.DAYS));
            current.setSecondAppointment(secondAppointment);
            current.setDosesReceived(1);
        } else if (current.getSecondVaccineType() == null) {
            if (modified.getSecondVaccineType() == null) {
                String errorMessage =
                        "Second vaccine type needs to be provided: " + user.getEmail();
                logger.error(errorMessage);
                throw new IllegalArgumentException(errorMessage);
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
            String errorMessage = user.getEmail() + " does not have a vaccination record";
            logger.error(errorMessage);
            throw new IllegalArgumentException(errorMessage);
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
