package com.shorthis.service;

import com.shorthis.entities.User;
import com.shorthis.repository.UserRepository;
import com.shorthis.service.exception.UserNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

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
                .orElseThrow(() -> new UserNotFoundException("User not found"));

    }

    public List<User> findAll() {

        return userRepository.findAll();

    }
}
