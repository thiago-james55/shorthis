package com.shorthis.entities.input;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@AllArgsConstructor
@Getter
@Setter

public class UserInput {

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
