package org.sarique.backend.controller;

import org.sarique.backend.dto.LikeDto;
import org.sarique.backend.dto.mapper.LikeDtoMapper;
import org.sarique.backend.exception.TweetException;
import org.sarique.backend.exception.UserException;
import org.sarique.backend.model.Like;
import org.sarique.backend.model.User;
import org.sarique.backend.service.LikeService;
import org.sarique.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class LikeController {

    @Autowired
    private LikeService likeService;

    @Autowired
    private UserService userService;

    @PostMapping("/{tweetId}/likes")
    public ResponseEntity<LikeDto> likeTweet(@PathVariable Long tweetId, @RequestHeader("Authorization") String jwtToken) throws UserException, TweetException {
        User user = userService.findUserProfileByJwt(jwtToken);
        Like like = likeService.likeTweet(tweetId, user);

        LikeDto likeDto = LikeDtoMapper.toLikeDto(like,user);
        return new ResponseEntity<>(likeDto, HttpStatus.CREATED);
    }

    @GetMapping("/tweet/{tweetId}")
    public ResponseEntity<List<LikeDto>> getAllLikes(@PathVariable Long tweetId, @RequestHeader("Authorization") String jwtToken) throws UserException, TweetException {
        User user = userService.findUserProfileByJwt(jwtToken);
        List<Like> likes = likeService.getAllLikes(tweetId);

        List<LikeDto> likeDtos = LikeDtoMapper.toLikeDtos(likes,user);
        return new ResponseEntity<>(likeDtos, HttpStatus.CREATED);
    }
}
