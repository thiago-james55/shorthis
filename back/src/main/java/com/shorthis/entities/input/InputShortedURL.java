package com.shorthis.entities.input;

import com.shorthis.entities.User;
import lombok.AllArgsConstructor;

import javax.persistence.Entity;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@AllArgsConstructor

@Entity
public class InputShortedURL {

    @NotBlank
    @NotNull
    private String url;

    private User user;


}
