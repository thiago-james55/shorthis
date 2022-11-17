package com.shorthis.Entities.controller;

import com.shorthis.Entities.ShortedURL;
import com.shorthis.Entities.User;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;


@RestController
@RequestMapping("/shorthis")
public class ShortedURLController {

    @RequestMapping("/{shortKey}")
    public RedirectView localRedirect(@PathVariable String shortKey) {

        User user = new User("testing","John Test","john@gmail.com","Hui@813h",null);
        ShortedURL shortedURL = new ShortedURL("first","http://www.google.com",user);

        RedirectView redirectView = new RedirectView();
        redirectView.setUrl(shortedURL.getUrl());
        return redirectView;

    }


}


