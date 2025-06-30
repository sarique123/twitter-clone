package org.sarique.backend.dto;


import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class TweetDto {
    private Long id;
    private String content;
    private String imageUrl;
    private String videoUrl;
    private UserDto user;
    private LocalDateTime createdAt;
    private Integer totalLikes;
    private Integer totalReplies;
    private Integer totalRetweets;
    private Boolean isLiked;
    private Boolean isRetweet;
    private List<Long> retweetUserId;
    private List<TweetDto> replyTweets;
}
