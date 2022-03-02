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
    private Map<Integer, Integer> dosesRecieved;

    public Statistics() {
        this.centre = new HashMap<String, Integer>();
        this.firstAppointment = new HashMap<Date, Integer>();
        this.secondAppointment = new HashMap<Date, Integer>();
        this.firstVaccineType = new HashMap<VaccineType, Integer>();
        this.secondVaccineType = new HashMap<VaccineType, Integer>();
        this.dosesRecieved = new HashMap<Integer, Integer>();
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

    private void incrementDosesRecieved(int dosesRecieved) {
        this.dosesRecieved.putIfAbsent(dosesRecieved, 0);
        this.dosesRecieved.put(dosesRecieved, this.dosesRecieved.get(dosesRecieved));
    }

    public Statistics tallyVaccination(Vaccination vaccination) {
        incrementCentre(vaccination.getCentre());
        incrementFirstAppointment(vaccination.getFirstAppointment());
        incrementSecondAppointment(vaccination.getSecondAppointment());
        incrementFirstVaccineType(vaccination.getFirstVaccineType());
        incrementSecondVaccineType(vaccination.getSecondVaccineType());
        incrementDosesRecieved(vaccination.getDosesReceived());
        return this;
    }
}
