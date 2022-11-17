package com.shorthis.utils;

import com.google.common.hash.Hashing;

import java.nio.charset.StandardCharsets;

public class HashUtil {

    public String hashOfString(String in) {

        return Hashing.sha256().hashString(in, StandardCharsets.UTF_8).toString();

    }

}
