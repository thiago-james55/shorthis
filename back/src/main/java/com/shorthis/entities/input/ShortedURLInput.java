package com.shorthis.entities.input;

import com.shorthis.entities.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@AllArgsConstructor
@Getter
@Setter

public class ShortedURLInput {

    @NotBlank
    @NotNull
    private String url;

    private User user;


}
