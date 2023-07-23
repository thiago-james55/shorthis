package com.shorthis.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class ShortedURLSearch {

    private String shortKey;

    private String url;

    private String user;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ShortedURLSearch that = (ShortedURLSearch) o;
        return Objects.equals(shortKey, that.shortKey);
    }

    @Override
    public int hashCode() {
        return Objects.hash(shortKey);
    }
}
