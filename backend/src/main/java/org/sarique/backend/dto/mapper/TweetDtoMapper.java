package org.sarique.backend.dto.mapper;

import org.sarique.backend.dto.TweetDto;
import org.sarique.backend.dto.UserDto;
import org.sarique.backend.model.Tweet;
import org.sarique.backend.model.User;
import org.sarique.backend.util.TweetUtil;

import java.util.ArrayList;
import java.util.List;

public class TweetDtoMapper {
    public static TweetDto toTweetDto(Tweet tweet, User reqUser) {
        UserDto userDto = UserDtoMapper.toUserDto(tweet.getUser());

        Boolean isLiked = TweetUtil.isLikedByReqUser(reqUser,tweet);
        Boolean isRetweeted = TweetUtil.isRetweetedByReqUser(reqUser,tweet);
        List<Long> retweetUserId = new ArrayList<>();

        for(User user1 : tweet.getRetweetUsers()){
            retweetUserId.add(user1.getId());
        }

        TweetDto tweetDto = new TweetDto();
        tweetDto.setId(tweet.getId());
        tweetDto.setContent(tweet.getContent());
        tweetDto.setImageUrl(tweet.getImageUrl());
        tweetDto.setVideoUrl(tweet.getVideoUrl());
        tweetDto.setUser(userDto);
        tweetDto.setCreatedAt(tweet.getCreatedAt());
        tweetDto.setTotalLikes(tweet.getLikes().size());
        tweetDto.setTotalReplies(tweet.getReplyTweets().size());
        tweetDto.setTotalRetweets(tweet.getRetweetUsers().size());
        tweetDto.setIsLiked(isLiked);
        tweetDto.setIsRetweet(isRetweeted);
        tweetDto.setRetweetUserId(retweetUserId);
        tweetDto.setReplyTweets(toTweetDto(tweet.getReplyTweets(), reqUser));

        return tweetDto;
    }

    public static List<TweetDto> toTweetDto(List<Tweet> tweets, User reqUser) {
        List<TweetDto> tweetDtos = new ArrayList<>();

        for(Tweet tweet : tweets){
            TweetDto tweetDto = toReplyTweetDto(tweet,reqUser);
            tweetDtos.add(tweetDto);
        }
        return tweetDtos;
    }
    public static TweetDto toReplyTweetDto(Tweet tweet, User reqUser) {
        UserDto userDto = UserDtoMapper.toUserDto(tweet.getUser());

        Boolean isLiked = TweetUtil.isLikedByReqUser(reqUser,tweet);
        Boolean isRetweeted = TweetUtil.isRetweetedByReqUser(reqUser,tweet);
        List<Long> retweetUserId = new ArrayList<>();

        for(User user1 : tweet.getRetweetUsers()){
            retweetUserId.add(user1.getId());
        }

        TweetDto tweetDto = new TweetDto();
        tweetDto.setId(tweet.getId());
        tweetDto.setContent(tweet.getContent());
        tweetDto.setImageUrl(tweet.getImageUrl());
        tweetDto.setVideoUrl(tweet.getVideoUrl());
        tweetDto.setUser(userDto);
        tweetDto.setCreatedAt(tweet.getCreatedAt());
        tweetDto.setTotalLikes(tweet.getLikes().size());
        tweetDto.setTotalReplies(tweet.getReplyTweets().size());
        tweetDto.setTotalRetweets(tweet.getRetweetUsers().size());
        tweetDto.setIsLiked(isLiked);
        tweetDto.setIsRetweet(isRetweeted);
        tweetDto.setRetweetUserId(retweetUserId);

        return tweetDto;
    }
}
