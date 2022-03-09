package com.vax.warden.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.vax.warden.validation.ValidAge;
import com.vax.warden.validation.ValidEmail;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.*;
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
    @Size(min = 2, max = 64, message = "First Name: Must be between 2 and 64 characters!")
    private String firstName;

    @NotBlank
    @Size(min = 2, max = 64, message = "Last Name: Must be between 2 and 64 characters!")
    private String lastName;

    @NotNull
    @ValidAge(message = "[Date of Birth: User must be over 18!]")
    @Temporal(TemporalType.DATE)
    private Date dateOfBirth;

    @NotBlank
    @Pattern(
            regexp = "^(\\d{7})([A-Z]{1,2})$",
            message = "PPS No.: Invalid! Must be 7 digits followed by 1-2 letters.")
    private String ppsn;

    @NotBlank
    @Size(min = 2, max = 256, message = "Address: Must be between 2 and 256 characters!")
    private String address;

    @Email
    @ValidEmail(message = "[Email: User already exists!]")
    private String email;

    @NotBlank
    @Pattern(
            regexp = "^(\\+\\d{1,3}[- ]?)?\\d{10}$",
            message = "Phone No.: Invalid! Must be 10 digits long.")
    private String phoneNo;

    @NotBlank
    @Size(min = 2, max = 32, message = "Nationality: Must be between 2 and 32 characters!")
    private String nationality;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @Transient private String jwtToken;

    @Enumerated(EnumType.STRING)
    private UserRole userRole = UserRole.ROLE_USER;

    @OneToOne(cascade = CascadeType.ALL)
    @JsonIgnore
    private Vaccination vaccination;
}
