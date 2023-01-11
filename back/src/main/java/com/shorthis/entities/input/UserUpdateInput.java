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

public class UserUpdateInput {

    private String oldLogin;

    @Size(min = 5 , max = 60)
    private String login;

    @Size(min = 5 , max = 60)
    private String name;

    @Email
    private String email;

    @Size(min = 5 , max = 60)
    private String nonHashPassword;


}
