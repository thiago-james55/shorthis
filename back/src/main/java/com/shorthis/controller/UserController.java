package com.shorthis.controller;

import com.shorthis.entities.ShortedURL;
import com.shorthis.entities.User;
import com.shorthis.entities.dto.UserDTO;
import com.shorthis.entities.input.UserInput;
import com.shorthis.entities.input.UserLogin;
import com.shorthis.entities.mapper.UserMapper;
import com.shorthis.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@AllArgsConstructor

@CrossOrigin
@RestController
@RequestMapping("/shorthis/users")
public class UserController {

    UserService userService;
    UserMapper userMapper;

    @GetMapping
    public ResponseEntity<List<UserDTO>> findAllUsers() {

        return ResponseEntity.ok(userMapper.userListToUserDTOList(userService.findAll()));

    }

    @GetMapping("/{userLogin}")
    public ResponseEntity<UserDTO> findUserByLogin(@PathVariable String userLogin) {

        UserDTO userDTO = userMapper
                .userToUserDTO(userService.findUserByLoginOrElseThrow(userLogin));

        return ResponseEntity.ok(userDTO);
    }

    @GetMapping("/{userLogin}/urls")
    public ResponseEntity<List<ShortedURL>> findUserUrls(@PathVariable String userLogin) {
        List<ShortedURL> shortedURLList =  userService.findUserByLoginOrElseThrow(userLogin).getShortedURLS();

        return ResponseEntity.ok(shortedURLList);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<UserDTO> saveUser(@Valid @RequestBody UserInput input) {

        User user = userService.saveUser(userMapper.userInputToUser(input));

        return ResponseEntity.ok(userMapper.userToUserDTO(user));

    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<UserDTO> login(@Valid @RequestBody UserLogin input) {

        User user = userService.login(userMapper.userLoginToUser(input));

        return ResponseEntity.ok(userMapper.userToUserDTO(user));

    }


}


