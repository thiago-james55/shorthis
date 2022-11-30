package com.shorthis.service.exception;

public class ShortedUrlNotFoundException extends RuntimeException{

    public ShortedUrlNotFoundException(String message) {
        super(message);
    }

}
