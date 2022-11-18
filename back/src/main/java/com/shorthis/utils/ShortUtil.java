package com.shorthis.utils;

import com.shorthis.repository.ShortedURLRepository;
import org.springframework.stereotype.Component;

@Component
public class ShortUtil {

    private char[] dictionary;
    private int dictionaryLength;
    private ShortedURLRepository shortedURLRepository;

    public ShortUtil() {
        fillDictionary();
    }

    private void fillDictionary() {

        dictionary = new char[]{
                 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
                 'm','n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
                 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
                 '1','2','3','4','5','6','7','8','9','0','!', '#', '$' , '%', '-' , '+' , '_'};

        dictionaryLength = dictionary.length;

    }

    public String generateUniqueShortKey() {

        StringBuilder sb = new StringBuilder();

        do {

            for (int i = 0; i < 6; i++) {

                int random = (int) (Math.random() * dictionaryLength);

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
}
