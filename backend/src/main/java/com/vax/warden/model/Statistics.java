package com.vax.warden.model;

import java.util.Map;
import java.util.Date;
import java.util.HashMap;

public class Statistics {

  private Map<String, Integer> centre;
  private Map<Date, Integer> firstAppointmentDate;
  private Map<Date, Integer> secondAppointmentDate;
  private Map<VaccineType, Integer> firstVaccineType;
  private Map<VaccineType, Integer> secondVaccineType;
  private Map<Integer, Integer> dosesRecieved;

  Statistics() {
    this.centre = new HashMap<String, Integer>();
    this.firstAppointmentDate = new HashMap<Date, Integer>();
    this.secondAppointmentDate = new HashMap<Date, Integer>();
    this.firstVaccineType = new HashMap<VaccineType, Integer>();
    this.secondVaccineType = new HashMap<VaccineType, Integer>();
    this.dosesRecieved = new HashMap<Integer, Integer>();
  }

  public void incrementCentre(String centre) {
    this.centre.putIfAbsent(centre, 0);
    this.centre.put(centre, this.centre.get(centre));
  }

  public void incrementFirstAppointmentDate(Date firstAppointmentDate) {
    this.firstAppointmentDate.putIfAbsent(firstAppointmentDate, 0);
    this.firstAppointmentDate.put(firstAppointmentDate, this.firstAppointmentDate.get(firstAppointmentDate));
  }

  public void incrementSecondAppointmentDate(String secondAppointmentDate) {
    this.secondAppointmentDate.putIfAbsent(secondAppointmentDate, 0);
    this.secondAppointmentDate.put(secondAppointmentDate, this.secondAppointmentDate.get(secondAppointmentDate));
  }

  public void incrementFirstVaccineType(VaccineType firstVaccineType) {
    this.firstVaccineType.putIfAbsent(firstVaccineType, 0);
    this.firstVaccineType.put(firstVaccineType, this.firstVaccineType.get(firstVaccineType));
  }

  public void incrementSecondVaccineType(VaccineType secondVaccineType) {
    this.secondVaccineType.putIfAbsent(secondVaccineType, 0);
    this.secondVaccineType.put(secondVaccineType, this.secondVaccineType.get(secondVaccineType));
  }

  public void incrementDosesRecieved(int dosesRecieved) {
    this.dosesRecieved.putIfAbsent(dosesRecieved, 0);
    this.dosesRecieved.put(dosesRecieved, this.dosesRecieved.get(dosesRecieved));
  }
}
