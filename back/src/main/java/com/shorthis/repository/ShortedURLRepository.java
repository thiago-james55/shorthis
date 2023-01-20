package com.shorthis.repository;

import com.shorthis.entities.ShortedURL;
import com.shorthis.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShortedURLRepository extends JpaRepository<ShortedURL,String> {

    @Query(nativeQuery = true,
            value = "SELECT * FROM shortedurl WHERE url LIKE (%:url%)")
    List<ShortedURL> findByUrlLike(String url);

    List<ShortedURL> findByUser(User user);

}
