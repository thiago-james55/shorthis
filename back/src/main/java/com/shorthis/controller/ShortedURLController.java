package com.shorthis.controller;

import com.shorthis.entities.ShortedURL;
import com.shorthis.entities.ShortedURLSearch;
import com.shorthis.entities.User;
import com.shorthis.entities.input.ShortedURLInput;
import com.shorthis.service.ShortedURLService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;


import javax.validation.Valid;
import java.util.List;

@AllArgsConstructor

@CrossOrigin
@RestController
@RequestMapping("/shorthis/shortedurls")
public class ShortedURLController {

    ShortedURLService shortedURLService;

    @GetMapping
    public ResponseEntity<List<ShortedURL>> findAllShorts() {

        return ResponseEntity.ok(shortedURLService.findAll());

    }

    @GetMapping("/{shortKey}/show")
    public ResponseEntity<ShortedURL> getShortedUrl(@PathVariable String shortKey) {

        ShortedURL shortedURL = shortedURLService.findShortedUrlByShortKeyOrThrow(shortKey);

        return ResponseEntity.ok(shortedURL);

    }

    @GetMapping("/{shortKeyOrUrl}/search")
    public ResponseEntity<List<ShortedURLSearch>> searchShortKeyOrUrl(@PathVariable String shortKeyOrUrl) {

        List<ShortedURL> shortedURLS = shortedURLService.findByShortKeyOrUrl(shortKeyOrUrl);

        return ResponseEntity.ok(shortedURLService.shortedURLSToSearch(shortedURLS));

    }

    @GetMapping("/user/{userLogin}")
    public ResponseEntity<List<ShortedURL>> findShortedUrlsByUser(@PathVariable String userLogin) {

        User user = new User();
        user.setLogin(userLogin);

        return ResponseEntity.ok(shortedURLService.findShortedUrlsByUser(user));

    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<ShortedURL> shortAndSave(@Valid @RequestBody ShortedURLInput shortedURLInput) {

        ShortedURL savedShortedUrl = shortedURLService.shortAndSave(shortedURLInput);

        return ResponseEntity.ok(savedShortedUrl);

    }

    @PatchMapping
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ShortedURL> patchShortedUrl(@RequestBody ShortedURL shortedURL) {

        ShortedURL patchShortedURL = shortedURLService.patchShortedURL(shortedURL);

        return ResponseEntity.ok(patchShortedURL);

    }


}


