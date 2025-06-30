package org.sarique.backend.service;

import org.sarique.backend.exception.TweetException;
import org.sarique.backend.exception.UserException;
import org.sarique.backend.model.Like;
import org.sarique.backend.model.User;

import java.util.List;

public interface LikeService {

    public Like likeTweet(Long tweetId, User user) throws UserException, TweetException;

    public List<Like> getAllLikes(Long tweetId) throws TweetException;

}
