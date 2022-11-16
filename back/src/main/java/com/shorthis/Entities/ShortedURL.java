package com.shorthis.Entities;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.net.URL;
import java.util.Objects;

@AllArgsConstructor
@Getter
@Setter

@Table
@Entity
public class ShortedURL {

    @Id
    @NotNull
    @NotBlank
    @Column(unique = true)
    private String shortKey;

    @NotNull
    @NotBlank
    @Column(unique = true)
    private URL url;

    @NotNull
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
