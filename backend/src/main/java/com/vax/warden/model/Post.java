package com.vax.warden.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Date;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "forum")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreationTimestamp private Date timestamp;

    private Long replyToPostId;

    @JsonIgnore @ManyToOne private User poster;

    @NotBlank
    @Lob
    @Column(length = 100000)
    private String content;

    @JsonProperty("firstName")
    public String getFirstName() {
        return poster.getFirstName();
    }

    @JsonProperty("lastName")
    public String getLastName() {
        return poster.getLastName();
    }
}
