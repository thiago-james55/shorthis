package com.shorthis.service;

import com.shorthis.entities.dto.UserDTO;
import com.shorthis.entities.mapper.UserMapper;
import com.shorthis.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class UserService {

    private UserRepository userRepository;
    private UserMapper userMapper;

    public List<UserDTO> findAllUsers() {

        return userMapper.userListToUserDTOList(userRepository.findAll());

    }

}
