package org.sarique.backend.model;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Tweet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String content;
    private String imageUrl;
    private String videoUrl;

    @OneToMany(mappedBy = "tweet", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Like> likes = new ArrayList<>();

    @OneToMany(mappedBy = "replyFor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Tweet> replyTweets = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "retweet_users",
            joinColumns = @JoinColumn(name = "tweet_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> retweetUsers = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "reply_for_id")
    private Tweet replyFor;

    private Boolean isReply;
    private Boolean isRetweet;

    private LocalDateTime createdAt;
}
