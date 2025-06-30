package org.sarique.backend.service;

import org.sarique.backend.exception.TweetException;
import org.sarique.backend.exception.UserException;
import org.sarique.backend.model.Tweet;
import org.sarique.backend.model.User;
import org.sarique.backend.repository.TweetRepository;
import org.sarique.backend.request.TweetReplyReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TweetServiceImp implements TweetService {

    @Autowired
    private TweetRepository tweetRepository;

    @Override
    public Tweet createTweet(Tweet req, User user) throws UserException, TweetException {
        Tweet tweet = Tweet.builder().
                content(req.getContent())
                .imageUrl(req.getImageUrl())
                .videoUrl(req.getVideoUrl())
                .user(user)
                .isReply(false)
                .isRetweet(true)
                .createdAt(LocalDateTime.now())
                .build();
        return tweetRepository.save(tweet);
    }

    @Override
    public List<Tweet> findAllTweets() {
        return tweetRepository.findAllByIsRetweetTrueOrderByCreatedAtDesc();
    }

    @Override
    public Tweet reTweet(Long tweetId, User user) throws TweetException {

        Tweet tweet = findById(tweetId);

        if(tweet.getRetweetUsers().contains(user)) {
            tweet.getRetweetUsers().remove(user);
        }else{
            tweet.getRetweetUsers().add(user);
        }

        return tweetRepository.save(tweet);
    }

    @Override
    public Tweet findById(Long tweetId) throws TweetException {
        Tweet tweet = tweetRepository.findById(tweetId)
                .orElseThrow(() -> new TweetException("Tweet not found with ID " + tweetId));
        return tweet;
    }

    @Override
    public void deleteTweetById(Long tweetId, Long userId) throws TweetException, UserException {
        Tweet tweet = findById(tweetId);

        if(!userId.equals(tweet.getUser().getId())) {
            throw new UserException("User can not delete other user's tweet");
        }
        tweetRepository.deleteById(tweetId);
    }

    @Override
    public Tweet removeFromRetweet(Long tweetId, User user) throws TweetException, UserException {
        return null;
    }

    @Override
    public Tweet createdReply(TweetReplyReq req, User user) throws TweetException {
        Optional<Tweet> replyFor = tweetRepository.findById(req.getTweetId());

        Tweet tweet = Tweet.builder().
                content(req.getContent())
                .imageUrl(req.getImageUrl())
                .user(user)
                .isReply(true)
                .isRetweet(false)
                .createdAt(LocalDateTime.now())
                .replyFor(replyFor.orElse(null))
                .build();

        Tweet savedReply = tweetRepository.save(tweet);
        tweet.getReplyTweets().add(savedReply);
        tweetRepository.save(replyFor.orElse(null));
        return replyFor.orElse(null);
    }

    @Override
    public List<Tweet> getUserTweet(User user) {
        return tweetRepository.findByRetweetUsersContainsOrUser_IdAndIsRetweetTrueOrderByCreatedAtDesc(user,user.getId());
    }

    @Override
    public List<Tweet> findByLikesContainingUser(User user) {
        return tweetRepository.findByLikesUser_Id(user.getId());
    }
}
