package org.sarique.backend.controller;

import org.sarique.backend.dto.UserDto;
import org.sarique.backend.dto.mapper.UserDtoMapper;
import org.sarique.backend.exception.UserException;
import org.sarique.backend.model.User;
import org.sarique.backend.service.UserService;
import org.sarique.backend.util.UserUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<UserDto> getUserProfile(@RequestHeader("Authorization") String jwtToken) throws UserException{
        User user = userService.findUserProfileByJwt(jwtToken);
        UserDto userDto = UserDtoMapper.toUserDto(user);
        userDto.setIsRequestedUser(true);
        return new ResponseEntity<>(userDto, HttpStatus.ACCEPTED);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long userId, @RequestHeader("Authorization") String jwtToken) throws UserException{
        User reqUser = userService.findUserProfileByJwt(jwtToken);

        User user = userService.findUserById(userId);
        UserDto userDto = UserDtoMapper.toUserDto(user);
        userDto.setIsRequestedUser(UserUtil.isReqUser(reqUser,user));
        userDto.setFollowed(UserUtil.isFollowedByReqUser(reqUser,user));
        return new ResponseEntity<>(userDto, HttpStatus.ACCEPTED);
    }

    @GetMapping("/search")
    public ResponseEntity<List<UserDto>> searchUser(@RequestParam String query, @RequestHeader("Authorization") String jwtToken) throws UserException{
        User reqUser = userService.findUserProfileByJwt(jwtToken);

        List<User> users = userService.searchUser(query);
        List<UserDto> userDtos = UserDtoMapper.toUserDto(users);

        return new ResponseEntity<>(userDtos, HttpStatus.ACCEPTED);
    }

    @PutMapping("/update")
    public ResponseEntity<UserDto> searchUser(@RequestBody User req, @RequestHeader("Authorization") String jwtToken) throws UserException{
        User reqUser = userService.findUserProfileByJwt(jwtToken);

        User user = userService.updateUser(reqUser.getId(),req);
        UserDto userDto = UserDtoMapper.toUserDto(user);

        return new ResponseEntity<>(userDto, HttpStatus.ACCEPTED);
    }

    @PutMapping("/{userId}/follow")
    public ResponseEntity<UserDto> searchUser(@PathVariable Long userId, @RequestHeader("Authorization") String jwtToken) throws UserException{
        User reqUser = userService.findUserProfileByJwt(jwtToken);

        User user = userService.followUser(userId,reqUser);
        UserDto userDto = UserDtoMapper.toUserDto(user);
        userDto.setFollowed(UserUtil.isFollowedByReqUser(reqUser,user));
        return new ResponseEntity<>(userDto, HttpStatus.ACCEPTED);
    }
}
