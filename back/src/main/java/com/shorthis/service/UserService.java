package com.shorthis.service;

import com.shorthis.entities.User;
import com.shorthis.entities.dto.UserDTO;
import com.shorthis.entities.input.UserInput;
import com.shorthis.repository.UserRepository;
import com.shorthis.service.exception.UserException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@AllArgsConstructor
@Service
public class UserService {

    private UserRepository userRepository;

    public List<User> findAllUsers() {

        return userRepository.findAll();

    }

    public User findUserByLoginOrElseThrow(String login) {

        return userRepository.findById(login)
                .orElseThrow(() -> new UserException("User not found"));

    }

    public List<User> findAll() {

        return userRepository.findAll();

    }

    public User saveUser(User user) {

        existsUserWithSameLoginOrPassword(user);

        return userRepository.save(user);


    }

    private void existsUserWithSameLoginOrPassword(User user) {

        List<String> fields = new ArrayList<>();

        if (userRepository.existsById(user.getLogin())) fields.add("login");
        if (userRepository.existsByEmail(user.getEmail())) fields.add("email");

        if ( fields.size() > 0) throw new UserException("User with " + fields.toString() + " already exists");
    }
}
