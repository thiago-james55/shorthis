package com.shorthis.security;

import com.shorthis.entities.User;
import com.shorthis.utils.HashUtil;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@Component
public class UserSecurity {

    private HashUtil hashUtil;

    public boolean isCorrectPassword(String login, String pass) {

        //Get User from Repository
        User user = new User(
                "testing","John Test","john@gmail.com","Hui@813h",null
        );

        return isHashEquals(user.getHashPassword(), pass);

    }

    private boolean isHashEquals(String hashPass , String pass) { return hashPass.equals(hashUtil.hashOfString(pass)); }

}
