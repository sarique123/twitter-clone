package org.sarique.backend.controller;

import org.sarique.backend.dto.TweetDto;
import org.sarique.backend.dto.mapper.TweetDtoMapper;
import org.sarique.backend.exception.TweetException;
import org.sarique.backend.exception.UserException;
import org.sarique.backend.model.Tweet;
import org.sarique.backend.model.User;
import org.sarique.backend.request.TweetReplyReq;
import org.sarique.backend.response.ApiResponse;
import org.sarique.backend.service.TweetService;
import org.sarique.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tweets")
public class TweetController {

    @Autowired
    private TweetService tweetService;

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<TweetDto> createTweet(@RequestBody Tweet req, @RequestHeader("Authorization") String jwtToken) throws UserException, TweetException {
        User user = userService.findUserProfileByJwt(jwtToken);
        Tweet tweet = tweetService.createTweet(req,user);

        TweetDto tweetDto = TweetDtoMapper.toTweetDto(tweet,user);
        return new ResponseEntity<>(tweetDto, HttpStatus.CREATED);
    }

    @PostMapping("/reply")
    public ResponseEntity<TweetDto> replyTweet(@RequestBody TweetReplyReq req, @RequestHeader("Authorization") String jwtToken) throws UserException, TweetException {
        User user = userService.findUserProfileByJwt(jwtToken);
        Tweet tweet = tweetService.createdReply(req,user);

        TweetDto tweetDto = TweetDtoMapper.toTweetDto(tweet,user);
        return new ResponseEntity<>(tweetDto, HttpStatus.CREATED);
    }

    @PutMapping("/{tweetId}/retweet")
    public ResponseEntity<TweetDto> reTweet(@PathVariable Long tweetId, @RequestHeader("Authorization") String jwtToken) throws UserException, TweetException {
        User user = userService.findUserProfileByJwt(jwtToken);
        Tweet tweet = tweetService.reTweet(tweetId,user);

        TweetDto tweetDto = TweetDtoMapper.toTweetDto(tweet,user);
        return new ResponseEntity<>(tweetDto, HttpStatus.OK);
    }

    @GetMapping("/{tweetId}")
    public ResponseEntity<TweetDto> findTweetById(@PathVariable Long tweetId, @RequestHeader("Authorization") String jwtToken) throws UserException, TweetException {
        User user = userService.findUserProfileByJwt(jwtToken);
        Tweet tweet = tweetService.findById(tweetId);

        TweetDto tweetDto = TweetDtoMapper.toTweetDto(tweet,user);
        return new ResponseEntity<>(tweetDto, HttpStatus.OK);
    }

    @DeleteMapping("/tweetId")
    public ResponseEntity<ApiResponse> deleteTweet(@PathVariable Long tweetId, @RequestHeader("Authorization") String jwtToken) throws UserException, TweetException {
        User user = userService.findUserProfileByJwt(jwtToken);
        tweetService.deleteTweetById(tweetId,user.getId());

        ApiResponse apiResponse = new ApiResponse("Tweet deleted successfully", true);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<List<TweetDto>> getAllTweets(@RequestHeader("Authorization") String jwtToken) throws UserException, TweetException {
        User user = userService.findUserProfileByJwt(jwtToken);

        List<Tweet> tweets = tweetService.findAllTweets();

        List<TweetDto> tweetDtos = TweetDtoMapper.toTweetDto(tweets,user);
        return new ResponseEntity<>(tweetDtos, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TweetDto>> getUsersAllTweets(@PathVariable Long userId, @RequestHeader("Authorization") String jwtToken) throws UserException, TweetException {
        User user = userService.findUserProfileByJwt(jwtToken);

        List<Tweet> tweets = tweetService.getUserTweet(user);

        List<TweetDto> tweetDtos = TweetDtoMapper.toTweetDto(tweets,user);
        return new ResponseEntity<>(tweetDtos, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}/likes")
    public ResponseEntity<List<TweetDto>> findTweetByLikesContainsUser(@PathVariable Long userId, @RequestHeader("Authorization") String jwtToken) throws UserException, TweetException {
        User user = userService.findUserProfileByJwt(jwtToken);

        List<Tweet> tweets = tweetService.findByLikesContainingUser(user);

        List<TweetDto> tweetDtos = TweetDtoMapper.toTweetDto(tweets,user);
        return new ResponseEntity<>(tweetDtos, HttpStatus.OK);
    }
}
