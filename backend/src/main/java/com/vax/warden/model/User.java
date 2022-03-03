package com.vax.warden.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.vax.warden.validation.ValidAge;
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
    @Size(min = 2, max = 64, message = "Must be between 2 and 64 characters!")
    private String firstName;

    @NotBlank
    @Size(min = 2, max = 64, message = "Must be between 2 and 64 characters!")
    private String lastName;

    @NotNull
    @ValidAge(message = "User must be over 18!")
    @Temporal(TemporalType.DATE)
    private Date dateOfBirth;

    @NotBlank
    @Pattern(regexp = "^(\\d{7})([A-Z]{1,2})$", message = "Invalid PPSN!")
    private String ppsn;

    @NotBlank
    @Size(min = 2, max = 256, message = "Must be between 2 and 256 characters!")
    private String address;

    // TODO? switch to uniqueness checking with custom javax.validation
    @NotBlank
    @Email
    @Column(unique = true)
    private String email;

    @NotBlank
    @Pattern(regexp = "^(\\+\\d{1,3}[- ]?)?\\d{10}$", message = "Invalid phone number!")
    private String phoneNo;

    @NotBlank
    @Size(min = 2, max = 32, message = "Must be between 2 and 32 characters!")
    private String nationality;

    @NotNull 
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @Transient private String jwtToken;

    @Enumerated(EnumType.STRING)
    private UserRole userRole = UserRole.ROLE_USER;
}
