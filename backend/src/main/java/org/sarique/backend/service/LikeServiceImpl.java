package org.sarique.backend.service;

import org.sarique.backend.exception.TweetException;
import org.sarique.backend.exception.UserException;
import org.sarique.backend.model.Like;
import org.sarique.backend.model.Tweet;
import org.sarique.backend.model.User;
import org.sarique.backend.repository.LikeRepository;
import org.sarique.backend.repository.TweetRepository;
import org.sarique.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LikeServiceImpl implements LikeService{

    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private TweetRepository tweetRepository;

    @Autowired
    private TweetService tweetService;

    @Override
    public Like likeTweet(Long tweetId, User user) throws UserException, TweetException {
        Like isLikeExist = likeRepository.isLikeExist(user.getId(), tweetId);

        if(isLikeExist != null) {
            likeRepository.deleteById(isLikeExist.getId());
            return isLikeExist;
        }
        Tweet tweet = tweetService.findById(tweetId);
        Like like = Like.builder()
                .user(user)
                .tweet(tweet)
                .build();

        Like savedLike = likeRepository.save(like);
        tweet.getLikes().add(savedLike);
        tweetRepository.save(tweet);
        return savedLike;
    }

    @Override
    public List<Like> getAllLikes(Long tweetId) throws TweetException {
        Tweet tweet = tweetService.findById(tweetId);
        List<Like> likes = likeRepository.findByTweetId(tweetId);
        return likes;
    }
}
