package org.sarique.backend.dto.mapper;

import org.sarique.backend.dto.UserDto;
import org.sarique.backend.model.User;

import java.util.ArrayList;
import java.util.List;

public class UserDtoMapper {
    public static UserDto toUserDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setFullName(user.getFullName());
        userDto.setEmail(user.getEmail());
        userDto.setPhoneNumber(user.getPhoneNumber());
        userDto.setLocation(user.getLocation());
        userDto.setWebsite(user.getWebsite());
        userDto.setBirthDate(user.getBirthDate());
        userDto.setImage(user.getImage());
        userDto.setBackGroundImage(user.getBackGroundImage());
        userDto.setBio(user.getBio());
        userDto.setLoginWithGoogle(user.getLoginWithGoogle());
        userDto.setIsRequestedUser(user.getIsRequestedUser());
        userDto.setFollowers(toUserDto(user.getFollowers()));
        userDto.setFollowing(toUserDto(user.getFollowings()));
        //userDto.setIsVerified();
        return userDto;
    }
    public static List<UserDto> toUserDto(List<User> users) {
        List<UserDto> userDtos = new ArrayList<>();
        for(User user : users){
            UserDto userDto = new UserDto();
            userDto.setId(user.getId());
            userDto.setFullName(user.getFullName());
            userDto.setEmail(user.getEmail());
            userDto.setPhoneNumber(user.getPhoneNumber());
            userDto.setLocation(user.getLocation());
            userDto.setWebsite(user.getWebsite());
            userDto.setBirthDate(user.getBirthDate());
            userDto.setImage(user.getImage());
            userDto.setBackGroundImage(user.getBackGroundImage());
            userDtos.add(userDto);
        }
        return userDtos;
    }
}
