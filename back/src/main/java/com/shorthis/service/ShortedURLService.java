package com.shorthis.service;

import com.shorthis.entities.ShortedURL;
import com.shorthis.entities.User;
import com.shorthis.repository.ShortedURLRepository;
import com.shorthis.service.exception.ShortedUrlException;
import com.shorthis.utils.ShortUtil;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

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

    public ShortedURL shortAndSave(String url , String userLogin){

        String validUrl = shortUtil.validateUrl(url);

        String shortKey = shortUtil.generateUniqueShortKey();

        User user = userService.findUserByLoginOrElseThrow(userLogin);

        ShortedURL shortedURL = new ShortedURL(shortKey,validUrl,user);

        return shortedURLRepository.save(shortedURL);

    }

    public List<ShortedURL> findAll() {

        return shortedURLRepository.findAll();

    }

    public ShortedURL findShortedUrlByShortKeyOrThrow(String shortKey) {

        return shortedURLRepository.findById(shortKey)
                .orElseThrow( () -> new ShortedUrlException("ShortKey not found"));

    }
}
