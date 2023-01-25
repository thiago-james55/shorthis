package com.shorthis.utils;

import com.shorthis.repository.ShortedURLRepository;
import com.shorthis.service.exception.UrlException;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.net.MalformedURLException;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.Arrays;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@AllArgsConstructor

@Getter
@Setter

@Component
public class ShortUtil {

    private ShortedURLRepository shortedURLRepository;

    private final char[] dictionary = new char[]{
                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
                'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
                'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
                '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'};

    private final Pattern pattern = Pattern.compile("(^(https:\\/\\/)|(http:\\/\\/)|(ftp:\\/\\/))(\\w|\\W)*");
    private final String[] protocolsAllowed = {"https://","http://","ftp://"};

    public String generateUniqueShortKey() {

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

    private boolean shortKeyIsNotUnique(String generatedShortKey) {

        return shortedURLRepository.existsById(generatedShortKey);

    }

    public String validateUrl(String url) {

        if ( urlHaveProtocol(url) && isUrlValid(url) ) return url;
        else { return tryToFixUrlMissingProtocol(url); }

    }


    public boolean isUrlValid(String url) {

        try {
            new URL(url).toURI();
            return true;
        } catch (MalformedURLException | URISyntaxException e) {
            return false;
        }

    }

    private String tryToFixUrlMissingProtocol(String url) {

        StringBuilder sb;

        for (String protocol : protocolsAllowed) {

            sb = new StringBuilder();

            sb.append(protocol);
            sb.append(url);

            if (isUrlValid(sb.toString())) return sb.toString();

        }

        throw new UrlException("Url is invalid! Protocols allowed are: " + Arrays.toString(protocolsAllowed));

    }

    private boolean urlHaveProtocol(String url) {
        Matcher matcher = pattern.matcher(url);
        return matcher.matches();
    }


}
