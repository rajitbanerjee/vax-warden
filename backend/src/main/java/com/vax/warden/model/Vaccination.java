package com.vax.warden.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.time.LocalDateTime;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "vaccinations")
public class Vaccination implements Serializable {
    private static final long serialVersionUID = 28382774L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(mappedBy = "vaccination")
    @JsonIgnore
    private User user;

    private String centre;

    private LocalDateTime firstAppointment;

    private LocalDateTime secondAppointment;

    @Enumerated(EnumType.STRING)
    private VaccineType firstVaccineType;

    @Enumerated(EnumType.STRING)
    private VaccineType secondVaccineType;

    private Integer dosesReceived = 0;
}
