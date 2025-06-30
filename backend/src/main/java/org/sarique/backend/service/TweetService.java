package org.sarique.backend.service;

import org.sarique.backend.exception.TweetException;
import org.sarique.backend.exception.UserException;
import org.sarique.backend.model.Tweet;
import org.sarique.backend.model.User;
import org.sarique.backend.request.TweetReplyReq;


import java.util.List;

public interface TweetService {

    // Create a new tweet by the given user
    public Tweet createTweet(Tweet req, User user) throws UserException, TweetException;

    // Retrieve all tweets from the database  (for home page)
    public List<Tweet> findAllTweets();

    // Retweet an existing tweet for the given user
    public Tweet reTweet(Long tweetId, User user) throws UserException, TweetException;

    // Find a tweet by its ID
    public Tweet findById(Long tweetId) throws TweetException;

    // Delete a tweet by its ID (only if it belongs to the user)
    public void deleteTweetById(Long tweetId, Long userId) throws TweetException, UserException;

    // Remove the given tweet from the user's retweets
    public Tweet removeFromRetweet(Long tweetId,User user) throws TweetException, UserException;

    // Create a reply tweet to an existing tweet
    public Tweet createdReply(TweetReplyReq req, User user) throws TweetException;

    // Get all tweets created by a specific user
    public List<Tweet> getUserTweet(User user);

    // Get all tweets liked by a specific user
    public List<Tweet> findByLikesContainingUser(User user);
}
