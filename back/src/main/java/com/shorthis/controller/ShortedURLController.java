package com.shorthis.controller;

import com.shorthis.entities.dto.UserDTO;
import com.shorthis.entities.ShortedURL;
import com.shorthis.entities.User;
import com.shorthis.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import java.util.List;

@AllArgsConstructor

@RestController
@RequestMapping("/shorthis")
public class ShortedURLController {

    UserService userService;

    @GetMapping
    public ResponseEntity<List<UserDTO>> findAllUsers() {

        return ResponseEntity.ok(userService.findAllUsers());

    }

    @RequestMapping("/{shortKey}")
    public RedirectView localRedirect(@PathVariable String shortKey) {

        User user = new User("testing","John Test","john@gmail.com","Hui@813h",null);
        ShortedURL shortedURL = new ShortedURL("first","http://www.google.com",user);

        RedirectView redirectView = new RedirectView();
        redirectView.setUrl(shortedURL.getUrl());
        return redirectView;

    }


}


