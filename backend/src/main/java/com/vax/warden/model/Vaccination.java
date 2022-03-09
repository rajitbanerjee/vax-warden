package com.vax.warden.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "vaccinations")
public class Vaccination implements Serializable {
    private static final long serialVersionUID = 28382774L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne(mappedBy = "vaccination")
    @JsonIgnore
    private User user;

    @NotBlank @NonNull private String centre;

    @NotNull
    @Column
    @Temporal(TemporalType.TIMESTAMP)
    private Date firstAppointment;

    /* properties set/updated by admin/automatically later */

    @Temporal(TemporalType.TIMESTAMP)
    private Date secondAppointment;

    private VaccineType firstVaccineType;
    private VaccineType secondVaccineType;
    private Integer dosesReceived = 0;
}
