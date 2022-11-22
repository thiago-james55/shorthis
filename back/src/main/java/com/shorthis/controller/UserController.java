package com.shorthis.controller;

import com.shorthis.entities.ShortedURL;
import com.shorthis.entities.User;
import com.shorthis.entities.dto.UserDTO;
import com.shorthis.entities.mapper.UserMapper;
import com.shorthis.service.ShortedURLService;
import com.shorthis.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import java.net.URI;
import java.util.List;

@AllArgsConstructor

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

}


