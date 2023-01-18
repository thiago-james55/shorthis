package com.shorthis.service;

import com.shorthis.entities.ShortedURL;
import com.shorthis.entities.ShortedURLSearch;
import com.shorthis.entities.User;
import com.shorthis.entities.input.ShortedURLInput;
import com.shorthis.repository.ShortedURLRepository;
import com.shorthis.service.exception.ShortedUrlNotFoundException;
import com.shorthis.utils.ShortUtil;
import lombok.AllArgsConstructor;
import org.checkerframework.checker.units.qual.A;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Service
public class ShortedURLService {

    private ShortUtil shortUtil;
    private ShortedURLRepository shortedURLRepository;
    private UserService userService;

    public List<ShortedURL> findAllShortedURLS() {

        return shortedURLRepository.findAll();

    }

    public ShortedURL shortAndSave(ShortedURLInput shortedURLInput){


        String validUrl = shortUtil.validateUrl(shortedURLInput.getUrl());

        String shortKey = shortUtil.generateUniqueShortKey();

        User user;

        if (shortedURLInput.getUser() != null) {
           user = userService.findUserByLoginOrElseThrow(shortedURLInput.getUser().getLogin());
        } else {
            user = new User();
            user.setLogin("Anonymous");
        }

        ShortedURL shortedURL = new ShortedURL(shortKey,validUrl,user);

        return shortedURLRepository.save(shortedURL);

    }

    public List<ShortedURL> findAll() {

        return shortedURLRepository.findAll();

    }

    public List<ShortedURL> findByShortKeyOrUrl(String shortKeyOrUrl) {

        List<ShortedURL> results = new ArrayList<>();

        try {
            results.add(findShortedUrlByShortKeyOrThrow(shortKeyOrUrl));
            return results;
        } catch (ShortedUrlNotFoundException ignored) {

        }

        results = shortedURLRepository.findByUrlLike(shortKeyOrUrl);

        if (results.size() > 0) { return results; }
        else { throw new ShortedUrlNotFoundException("Shorkey and URL not found!"); }
    }

    public ShortedURL findShortedUrlByShortKeyOrThrow(String shortKey) {

        return shortedURLRepository.findById(shortKey)
                .orElseThrow( () -> new ShortedUrlNotFoundException("ShortKey " + shortKey + "not found"));

    }

    public List<ShortedURLSearch> shortedURLSToSearch(List<ShortedURL> shortedURLS) {

        ArrayList<ShortedURLSearch> shortedUrlsSearch = new ArrayList<>();

        shortedURLS.forEach(shortedURL -> {

            ShortedURLSearch shortedURLSearch = new ShortedURLSearch(
                    shortedURL.getShortKey(),
                    shortedURL.getUrl(),
                    shortedURL.getUser().getLogin()
            );

            shortedUrlsSearch.add(shortedURLSearch);

        });

        return  shortedUrlsSearch;
    }
}
