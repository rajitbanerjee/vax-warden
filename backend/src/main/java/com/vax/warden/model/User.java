package com.vax.warden.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.vax.warden.encryption.DateEncryptor;
import com.vax.warden.encryption.StringEncryptor;
import com.vax.warden.validation.*;
import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
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
    @Convert(converter = StringEncryptor.class)
    private String firstName;

    @NotBlank
    @Size(min = 2, max = 64, message = "Last Name: Must be between 2 and 64 characters!")
    @Convert(converter = StringEncryptor.class)
    private String lastName;

    @NotNull
    @ValidAge(message = "Date of Birth: User must be over 18!")
    @Temporal(TemporalType.DATE)
    @Convert(converter = DateEncryptor.class)
    private Date dateOfBirth;

    @ValidPPSN(message = "PPS No.: Must be 7 digits followed by 1-2 letters. Must be unique.")
    @Convert(converter = StringEncryptor.class)
    private String ppsn;

    @NotBlank
    @Size(min = 2, max = 256, message = "Address: Must be between 2 and 256 characters!")
    @Convert(converter = StringEncryptor.class)
    private String address;

    @Email
    @ValidEmail(message = "Email: User already exists!")
    @Convert(converter = StringEncryptor.class)
    private String email;

    @NotBlank
    @Pattern(
            regexp = "^(\\+\\d{1,3}[- ]?)?\\d{10}$",
            message = "Phone No.: Must be 10 digits long.")
    @Convert(converter = StringEncryptor.class)
    private String phoneNo;

    @NotBlank
    @Size(min = 2, max = 32, message = "Nationality: Must be between 2 and 32 characters!")
    @Convert(converter = StringEncryptor.class)
    private String nationality;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @ValidPassword(message = "Password: Password is not strong enough!")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @Transient private String jwtToken;

    @Enumerated(EnumType.STRING)
    private UserRole userRole = UserRole.ROLE_USER;

    @OneToOne(cascade = CascadeType.ALL)
    private Vaccination vaccination;

    @OneToMany(mappedBy = "poster")
    @JsonIgnore
    private Set<Post> posts;

    public User() {
        posts = new HashSet<>();
    }

    public static int getAgeInYears(Date date) {
        LocalDate now = LocalDate.now();
        LocalDate birthdayDate =
                Instant.ofEpochMilli(date.getTime()).atZone(ZoneId.systemDefault()).toLocalDate();
        Period period = Period.between(birthdayDate, now);
        return period.getYears();
    }

    public String getAgeGroup() {
        int age = getAgeInYears(dateOfBirth);
        if (age < 12) return "< 12";
        if (age < 20) return "12-19";
        if (age < 30) return "20-29";
        if (age < 40) return "30-39";
        if (age < 50) return "40-49";
        if (age < 60) return "50-59";
        if (age < 70) return "60-69";
        if (age < 80) return "70-79";
        return "80+";
    }

    @JsonIgnore
    public void addPost(Post post) {
        posts.add(post);
    }
}
