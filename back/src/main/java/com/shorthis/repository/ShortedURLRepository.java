package com.shorthis.repository;

import com.shorthis.entities.ShortedURL;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShortedURLRepository extends JpaRepository<ShortedURL,String> {
}
