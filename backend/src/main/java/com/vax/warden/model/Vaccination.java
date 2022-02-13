package com.vax.warden.model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
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

    // TODO? switch to foreign key
    @Id private Long user_id;

    @NotBlank @NonNull private String centre;

    @NotNull
    @NonNull
    @Column(unique = true)
    @Temporal(TemporalType.TIMESTAMP)
    private Date first_appointment;

    /* properties set/updated by admin/automatically later */

    @Column(unique = true)
    @Temporal(TemporalType.TIMESTAMP)
    private Date second_appointment;

    private VaccineType first_vaccine_type;

    private VaccineType second_vaccine_type;

    private Integer doses_received = 0;
}
