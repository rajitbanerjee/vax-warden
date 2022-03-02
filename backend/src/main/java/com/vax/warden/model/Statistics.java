package com.vax.warden.model;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import lombok.Data;

@Data
public class Statistics {

    private Map<String, Integer> centre;
    private Map<Date, Integer> firstAppointment;
    private Map<Date, Integer> secondAppointment;
    private Map<VaccineType, Integer> firstVaccineType;
    private Map<VaccineType, Integer> secondVaccineType;
    private Map<Integer, Integer> dosesReceived;
    private Map<String, Integer> nationality;
    private Map<Gender, Integer> gender;

    public Statistics() {
        this.centre = new HashMap<String, Integer>();
        this.firstAppointment = new HashMap<Date, Integer>();
        this.secondAppointment = new HashMap<Date, Integer>();
        this.firstVaccineType = new HashMap<VaccineType, Integer>();
        this.secondVaccineType = new HashMap<VaccineType, Integer>();
        this.dosesReceived = new HashMap<Integer, Integer>();
        this.nationality = new HashMap<String, Integer>();
        this.gender = new HashMap<Gender, Integer>();
    }

    private void incrementCentre(String centre) {
        this.centre.putIfAbsent(centre, 0);
        this.centre.put(centre, this.centre.get(centre) + 1);
    }

    private void incrementFirstAppointment(Date firstAppointment) {
        if (firstAppointment == null) {
            return;
        }
        this.firstAppointment.putIfAbsent(firstAppointment, 0);
        this.firstAppointment.put(
                firstAppointment, this.firstAppointment.get(firstAppointment) + 1);
    }

    private void incrementSecondAppointment(Date secondAppointment) {
        if (secondAppointment == null) {
            return;
        }
        this.secondAppointment.putIfAbsent(secondAppointment, 0);
        this.secondAppointment.put(
                secondAppointment, this.secondAppointment.get(secondAppointment) + 1);
    }

    private void incrementFirstVaccineType(VaccineType firstVaccineType) {
        if (firstVaccineType == null) {
            return;
        }
        this.firstVaccineType.putIfAbsent(firstVaccineType, 0);
        this.firstVaccineType.put(
                firstVaccineType, this.firstVaccineType.get(firstVaccineType) + 1);
    }

    private void incrementSecondVaccineType(VaccineType secondVaccineType) {
        if (secondVaccineType == null) {
            return;
        }
        this.secondVaccineType.putIfAbsent(secondVaccineType, 0);
        this.secondVaccineType.put(
                secondVaccineType, this.secondVaccineType.get(secondVaccineType) + 1);
    }

    private void incrementDosesReceived(int dosesReceived) {
        this.dosesReceived.putIfAbsent(dosesReceived, 0);
        this.dosesReceived.put(dosesReceived, this.dosesReceived.get(dosesReceived));
    }

    private void incrementNationality(String nationality) {
        this.nationality.putIfAbsent(nationality, 0);
        this.nationality.put(nationality, this.nationality.get(nationality));
    }

    private void incrementGender(Gender gender) {
        this.gender.putIfAbsent(gender, 0);
        this.gender.put(gender, this.gender.get(gender));
    }

    public Statistics tallyVaccination(Vaccination vaccination, User user) {
        incrementCentre(vaccination.getCentre());
        incrementFirstAppointment(vaccination.getFirstAppointment());
        incrementSecondAppointment(vaccination.getSecondAppointment());
        incrementFirstVaccineType(vaccination.getFirstVaccineType());
        incrementSecondVaccineType(vaccination.getSecondVaccineType());
        incrementDosesReceived(vaccination.getDosesReceived());
        incrementNationality(user.getNationality());
        incrementGender(user.getGender());
        return this;
    }
}
