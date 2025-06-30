package org.sarique.backend.repository;

import org.sarique.backend.model.Tweet;
import org.sarique.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TweetRepository extends JpaRepository<Tweet, Long> {

    // Fetch all retweets, ordered by newest first
    List<Tweet> findAllByIsRetweetTrueOrderByCreatedAtDesc();

    // Fetch retweets made by the user or posted by the user, ordered by newest
    List<Tweet> findByRetweetUsersContainsOrUser_IdAndIsRetweetTrueOrderByCreatedAtDesc(User user,Long userId);

    List<Tweet> findByLikesContainingOrderByCreatedAtDesc(User user);

    // Fetch tweets liked by a specific user using JPQL
    @Query("SELECT t FROM Tweet t JOIN t.likes l WHERE l.user.id=:userId")
    List<Tweet> findByLikesUser_Id(Long userId);
}
