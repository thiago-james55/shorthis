package com.shorthis.controller;

import com.shorthis.entities.dto.UserDTO;
import com.shorthis.entities.ShortedURL;
import com.shorthis.entities.User;
import com.shorthis.service.ShortedURLService;
import com.shorthis.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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

    @RequestMapping("/{shortKey}")
    public RedirectView localRedirect(@PathVariable String shortKey) {

        ShortedURL shortedURL = shortedURLService.findShortedUrlByShortKeyOrThrow(shortKey);

        RedirectView redirectView = new RedirectView();
        redirectView.setUrl(shortedURL.getUrl());
        return redirectView;

    }



    @RequestMapping("/1")
    public ResponseEntity<Void> redirect(){

        return ResponseEntity.status(HttpStatus.FOUND).location(URI.create("https://fullstackdeveloper.guru")).build();
    }

    @PostMapping
    public ResponseEntity<ShortedURL> shortAndSave(@RequestBody ShortedURL shortedURL) {

        System.out.println(shortedURL.getUrl());
        System.out.println(shortedURL.getUser().getLogin());

        ShortedURL savedShortedUrl = shortedURLService
                .shortAndSave(shortedURL.getUrl(), shortedURL.getUser().getLogin());

        return ResponseEntity.ok(savedShortedUrl);

    }


}


