package org.sarique.backend.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class UserDto {
    private Long id;
    private String fullName;
    private String email;
    private String phoneNumber;
    private String location;
    private String website;
    private String birthDate;
    private String image;
    private String backGroundImage;
    private String bio;
    private Boolean isRequestedUser;
    private Boolean loginWithGoogle;
    private List<UserDto> followers = new ArrayList<>();
    private List<UserDto> following = new ArrayList<>();
    private Boolean followed;
    private Boolean isVerified;
}
