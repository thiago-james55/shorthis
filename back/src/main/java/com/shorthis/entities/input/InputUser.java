package com.shorthis.entities.input;

import com.shorthis.entities.User;
import lombok.AllArgsConstructor;

import javax.persistence.Entity;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@AllArgsConstructor

@Entity
public class InputUser {

    @NotBlank
    @NotNull

    @NotNull
    @NotBlank
    @Size(min = 5 , max = 60)
    private String login;

    @NotNull
    @NotBlank
    @Size(min = 5 , max = 60)
    private String name;

    @NotNull
    @NotBlank
    @Email
    private String email;

    @NotNull
    @NotBlank
    @Size(min = 5 , max = 60)
    private String nonHashPassword;


}
