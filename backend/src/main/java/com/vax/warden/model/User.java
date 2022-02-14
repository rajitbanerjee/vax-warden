package com.vax.warden.model;

import com.vax.warden.validation.ValidAge;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User implements Serializable {
    private static final long serialVersionUID = 1291327L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(min = 2, max = 64)
    private String first_name;

    @NotBlank
    @Size(min = 2, max = 64)
    private String last_name;

    @NotNull
    @ValidAge
    @Temporal(TemporalType.DATE)
    private Date date_of_birth;

    @NotBlank
    @Pattern(regexp = "^(\\d{7})([A-Z]{1,2})$")
    private String ppsn;

    @NotBlank
    @Size(min = 2, max = 500)
    private String address;

    // TODO? switch to uniqueness checking with custom javax.validation
    @NotBlank
    @Email
    @Column(unique = true)
    private String email;

    @NotBlank
    @Pattern(regexp = "^(\\+\\d{1,3}[- ]?)?\\d{10}$")
    private String phone_no;

    @NotBlank
    @Size(min = 2, max = 32)
    private String nationality;

    // TODO spring security encoding?
    @NotBlank private String password;

    @Enumerated(EnumType.STRING)
    private UserRole userRole = UserRole.ROLE_USER;
}
