package org.sarique.backend.dto.mapper;

import org.sarique.backend.dto.LikeDto;
import org.sarique.backend.dto.TweetDto;
import org.sarique.backend.dto.UserDto;
import org.sarique.backend.model.Like;
import org.sarique.backend.model.User;

import java.util.ArrayList;
import java.util.List;

public class LikeDtoMapper {
    public static LikeDto toLikeDto(Like like, User reqUser){
        UserDto reqUserDto = UserDtoMapper.toUserDto(reqUser);

        UserDto userDto = UserDtoMapper.toUserDto(like.getUser());
        TweetDto tweet = TweetDtoMapper.toTweetDto(like.getTweet(),reqUser);

        LikeDto likeDto = new LikeDto();
        likeDto.setId(like.getId());
        likeDto.setUser(userDto);
        likeDto.setTweet(tweet);

        return likeDto;
    }

    public static List<LikeDto> toLikeDtos(List<Like> likes, User reqUser){
        List<LikeDto> likeDtos = new ArrayList<>();

        for(Like like : likes){
            UserDto user = UserDtoMapper.toUserDto(like.getUser());
            TweetDto tweet = TweetDtoMapper.toTweetDto(like.getTweet(),reqUser);

            LikeDto likeDto = new LikeDto();
            likeDto.setId(like.getId());
            likeDto.setUser(user);
            likeDto.setTweet(tweet);

            likeDtos.add(likeDto);
        }
        return likeDtos;
    }
}
