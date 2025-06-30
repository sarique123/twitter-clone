package org.sarique.backend.request;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TweetReplyReq {
    private Long tweetId;
    private String content;
    private LocalDateTime createdAt;
    private String imageUrl;
}
