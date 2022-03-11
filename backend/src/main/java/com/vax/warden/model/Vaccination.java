package com.vax.warden.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.*;
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

    @Temporal(TemporalType.TIMESTAMP)
    private Date firstAppointment;

    @Temporal(TemporalType.TIMESTAMP)
    private Date secondAppointment;

    @Enumerated(EnumType.STRING)
    private VaccineType firstVaccineType;

    @Enumerated(EnumType.STRING)
    private VaccineType secondVaccineType;

    private Integer dosesReceived = 0;
}
