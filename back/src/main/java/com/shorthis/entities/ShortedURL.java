package com.shorthis.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

@Table
@Entity
public class ShortedURL {

    @Id
    @Column(unique = true)
    private String shortKey;

    @Column(unique = true)
    private String url;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @ManyToOne
    private User user;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ShortedURL that = (ShortedURL) o;
        return Objects.equals(shortKey, that.shortKey);
    }

    @Override
    public int hashCode() {
        return Objects.hash(shortKey);
    }
}
