package com.shorthis.controller;

import com.shorthis.entities.dto.UserDTO;
import com.shorthis.entities.ShortedURL;
import com.shorthis.entities.User;
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
@RequestMapping("/shorthis")
public class ShortedURLController {

    ShortedURLService shortedURLService;

    @GetMapping
    public ResponseEntity<List<ShortedURL>> findAllUsers() {

        return ResponseEntity.ok(shortedURLService.findAll());

    }

    @RequestMapping("/{shortKey}/1")
    public RedirectView localRedirect(@PathVariable String shortKey) {

        User user = new User("testing","John Test","john@gmail.com","Hui@813h",null);
        ShortedURL shortedURL = new ShortedURL("first","1321.11231",user);

        RedirectView redirectView = new RedirectView();
        redirectView.setUrl(shortedURL.getUrl());
        return redirectView;

    }



    @RequestMapping("/1")
    public ResponseEntity<Void> redirect(){

        return ResponseEntity.status(HttpStatus.FOUND).location(URI.create("fullstackdeveloper.guru")).build();
    }


}


