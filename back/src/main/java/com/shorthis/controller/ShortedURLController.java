package com.shorthis.controller;

import com.shorthis.entities.ShortedURL;
import com.shorthis.entities.input.ShortedURLInput;
import com.shorthis.service.ShortedURLService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;


import java.util.List;

@AllArgsConstructor

@RestController
@RequestMapping("/shorthis")
public class ShortedURLController {

    ShortedURLService shortedURLService;

    @GetMapping
    public ResponseEntity<List<ShortedURL>> findAllShorts() {

        return ResponseEntity.ok(shortedURLService.findAll());

    }

    @RequestMapping("/{shortKey}")
    public RedirectView localRedirect(@PathVariable String shortKey) {

        ShortedURL shortedURL = shortedURLService.findShortedUrlByShortKeyOrThrow(shortKey);

        RedirectView redirectView = new RedirectView();
        redirectView.setUrl(shortedURL.getUrl());
        return redirectView;

    }

    @GetMapping("/{shortKey}/show")
    public ResponseEntity<String> showUrlOfShortKey(@PathVariable String shortKey) {

        ShortedURL shortedURL = shortedURLService.findShortedUrlByShortKeyOrThrow(shortKey);

        return ResponseEntity.ok(shortedURL.getUrl());

    }

    @PostMapping
    public ResponseEntity<ShortedURL> shortAndSave(@RequestBody ShortedURLInput shortedURLInput) {

        ShortedURL savedShortedUrl = shortedURLService.shortAndSave(shortedURLInput);

        return ResponseEntity.ok(savedShortedUrl);

    }



}


