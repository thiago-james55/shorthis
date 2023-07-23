package com.shorthis.service;

import com.shorthis.entities.ShortedURL;
import com.shorthis.entities.ShortedURLSearch;
import com.shorthis.entities.User;
import com.shorthis.entities.input.ShortedURLInput;
import com.shorthis.repository.ShortedURLRepository;
import com.shorthis.service.exception.ShortedUrlException;
import com.shorthis.service.exception.ShortedUrlNotFoundException;
import com.shorthis.utils.ShortUtil;
import lombok.AllArgsConstructor;
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
            user = userService.anonymousUser();
        }

        ShortedURL shortedURL = new ShortedURL(shortKey,validUrl,user);

        return shortedURLRepository.save(shortedURL);

    }

    public ShortedURL patchShortedURL(ShortedURL patchedShortedURL) {

        ShortedURL oldShortedURL = findShortedUrlByShortKeyOrThrow(patchedShortedURL.getShortKey());

        boolean sameUser = oldShortedURL.getUser().getLogin().equals(patchedShortedURL.getUser().getLogin());

        if (sameUser) {
            oldShortedURL.setUrl(shortUtil.validateUrl(patchedShortedURL.getUrl()));
            return shortedURLRepository.save(oldShortedURL);
        } else {
            throw new ShortedUrlException("This shortkey is not from this user!");
        }

    }

    public void deleteShortedURL(ShortedURL deleteShortedURL) {

        ShortedURL oldShortedURL = findShortedUrlByShortKeyOrThrow(deleteShortedURL.getShortKey());

        boolean sameUser = oldShortedURL.getUser().getLogin().equals(deleteShortedURL.getUser().getLogin());
        boolean sameUrl = oldShortedURL.getUrl().equals(deleteShortedURL.getUrl()) ||
                oldShortedURL.getUrl().equals(deleteShortedURL.getUrl().substring(0,deleteShortedURL.getUrl().length()-1));

        if (sameUser && sameUrl) {
            shortedURLRepository.delete(deleteShortedURL);
        } else {
            if (!sameUser) { throw new ShortedUrlException("This shortkey is not from this user!"); }
            if (!sameUrl) { throw new ShortedUrlException("This url is not from this shortkey!"); }
        }

    }

    public List<ShortedURL> findAll() {

        return shortedURLRepository.findAll();

    }

    public List<ShortedURL> findShortedUrlsByUser(User user) {

        return shortedURLRepository.findByUser(user);
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
        else { throw new ShortedUrlNotFoundException("Shortkey and URL not found!"); }
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
