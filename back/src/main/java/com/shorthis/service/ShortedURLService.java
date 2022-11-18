package com.shorthis.service;

import com.shorthis.entities.ShortedURL;
import com.shorthis.entities.User;
import com.shorthis.entities.dto.UserDTO;
import com.shorthis.entities.mapper.UserMapper;
import com.shorthis.repository.ShortedURLRepository;
import com.shorthis.repository.UserRepository;
import com.shorthis.utils.ShortUtil;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class ShortedURLService {

    ShortUtil shortUtil;
    private ShortedURLRepository shortedURLRepository;

    public List<ShortedURL> findAllShortedURLS() {

        return shortedURLRepository.findAll();

    }

    public ShortedURL shortAndSave(String url , User user){


    }

}
