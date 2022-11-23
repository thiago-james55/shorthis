package com.shorthis.utils;

import com.shorthis.repository.ShortedURLRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.net.MalformedURLException;
import java.net.URISyntaxException;
import java.net.URL;

@AllArgsConstructor

@Component
public class ShortUtil {

    private char[] dictionary;
    private ShortedURLRepository shortedURLRepository;

    private void fillDictionary() {

        dictionary = new char[]{
                 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
                 'm','n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
                 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
                 '1','2','3','4','5','6','7','8','9','0'};

    }

    public String generateUniqueShortKey() {

        fillDictionary();

        StringBuilder sb;

        do {

            sb = new StringBuilder();

            for (int i = 0; i < 6; i++) {

                int random = (int) (Math.random() * dictionary.length);

                sb.append(dictionary[random]);

            }

        } while (shortKeyIsNotUnique(sb.toString()));

        return sb.toString();

    }

    private boolean shortKeyIsUnique(String generatedShortKey) {

        return !shortedURLRepository.existsById(generatedShortKey);

    }

    private boolean shortKeyIsNotUnique(String generatedShortKey) {

        return !shortKeyIsUnique(generatedShortKey);

    }

    public boolean isUrlValid(String url) {

        try {
            new URL(url).toURI();
            return true;
        } catch (MalformedURLException | URISyntaxException e) {
            return false;
        }

    }


}
