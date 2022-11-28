package com.shorthis.security;

import com.google.common.hash.Hashing;
import com.shorthis.entities.User;
import com.shorthis.utils.HashUtil;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;

@AllArgsConstructor
@Component
public class UserSecurity {

    private HashUtil hashUtil;

    public boolean isCorrectPassword(String login, String pass) {

        return true;

    }

    public String toSHA256(String in) {
        return Hashing.sha256().hashString(in, StandardCharsets.UTF_8).toString();
    }



}
