package com.shorthis.service;

import com.shorthis.entities.User;
import com.shorthis.repository.UserRepository;
import com.shorthis.security.UserSecurity;
import com.shorthis.service.exception.UserException;
import com.shorthis.service.exception.UserNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@AllArgsConstructor
@Service
public class UserService {

    private UserRepository userRepository;
    private UserSecurity userSecurity;

    public List<User> findAllUsers() {

        return userRepository.findAll();

    }

    public User findUserByLoginOrElseThrow(String login) {

        return userRepository.findById(login)
                .orElseThrow(() -> new UserNotFoundException("User " + login + " not found"));

    }

    public List<User> findAll() {

        return userRepository.findAll();

    }

    public User saveUser(User user) {

        existsUserWithSameLoginOrEmail(user);

        user.setHashPassword(userSecurity.toSHA256(user.getHashPassword()));

        return userRepository.save(user);

    }

    private void existsUserWithSameLoginOrEmail(User user) {

        List<String> fields = new ArrayList<>();

        if (userRepository.existsById(user.getLogin())) fields.add("login");
        if (userRepository.existsByEmail(user.getEmail())) fields.add("email");

        if ( fields.size() > 0) throw new UserException("User with " + fields.toString() + " already exists");

    }

    public User login(User user) {

        User local = this.findUserByLoginOrElseThrow(user.getLogin());

        boolean isCorrectPassword = userSecurity.isCorrectPassword(user.getHashPassword(), local.getHashPassword());

        if (isCorrectPassword) {
            return local;
        } else {
            throw new UserException("The password is incorrect!");
        }

    }

}
