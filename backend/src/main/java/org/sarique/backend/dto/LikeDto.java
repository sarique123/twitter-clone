package org.sarique.backend.dto;

import lombok.Data;

@Data
public class LikeDto {
    private Long id;
    private UserDto user;
    private TweetDto tweet;
}
