package com.shorthis.entities.mapper;

import com.shorthis.entities.dto.UserDTO;
import com.shorthis.entities.User;
import com.shorthis.entities.input.UserInput;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor

@Component
public class UserMapper {

    ModelMapper modelMapper;

    public UserDTO userToUserDTO(User user) {

        return modelMapper.map(user, UserDTO.class);

    }

    public List<UserDTO> userListToUserDTOList(List<User> users) {

        return users.stream()
                .map(this::userToUserDTO)
                .collect(Collectors.toList());

    }

    public User userInputToUser(UserInput input) {

        return modelMapper.map(input, User.class);

    }

}
