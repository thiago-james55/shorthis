package com.shorthis.entities.input;

import com.shorthis.entities.User;
import lombok.AllArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@AllArgsConstructor

public class ShortedURLInput {

    @NotBlank
    @NotNull
    private String url;

    private User user;


}
