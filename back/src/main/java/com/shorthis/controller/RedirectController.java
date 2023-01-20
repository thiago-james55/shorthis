package com.shorthis.controller;

import com.shorthis.entities.ShortedURL;
import com.shorthis.service.ShortedURLService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

@AllArgsConstructor

@RestController
@RequestMapping("/shorthis/")
public class RedirectController {

    ShortedURLService shortedURLService;

    @RequestMapping("/{shortKey}")
    public RedirectView localRedirect(@PathVariable String shortKey) {

        ShortedURL shortedURL = shortedURLService.findShortedUrlByShortKeyOrThrow(shortKey);

        RedirectView redirectView = new RedirectView();
        redirectView.setUrl(shortedURL.getUrl());
        return redirectView;

    }


}


