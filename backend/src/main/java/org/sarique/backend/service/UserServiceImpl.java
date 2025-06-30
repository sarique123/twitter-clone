package org.sarique.backend.service;

import org.sarique.backend.config.JwtProvider;
import org.sarique.backend.exception.UserException;
import org.sarique.backend.model.User;
import org.sarique.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtProvider jwtProvider;

    @Override
    public User findUserById(Long userId) throws UserException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserException("User not found with ID : " + userId));
        return user;
    }

    @Override
    public User findUserProfileByJwt(String jwt) throws UserException {
        String email = jwtProvider.getEmailFromToken(jwt);
        User user = userRepository.findByEmail(email);
        if(user == null) {
            throw new UserException("User not found with email : " + email);
        }
        return user;
    }

    @Override
    public User updateUser(Long userId, User updatedUser) throws UserException {
        User user = userRepository.findById(userId).get();

        if(user == null) {
            throw new UserException("User not found with ID : " + userId);
        }

        if(updatedUser.getFullName() != null){
            user.setFullName(updatedUser.getFullName());
        }
        if(updatedUser.getPhoneNumber() != null){
            user.setPhoneNumber(updatedUser.getPhoneNumber());
        }
        if(updatedUser.getLocation() != null){
            user.setLocation(updatedUser.getLocation());
        }
        if(updatedUser.getWebsite() != null){
            user.setWebsite(updatedUser.getWebsite());
        }
        if(updatedUser.getBirthDate() != null){
            user.setBirthDate(updatedUser.getBirthDate());
        }
        if(updatedUser.getImage() != null){
            user.setImage(updatedUser.getImage());
        }
        if(updatedUser.getBackGroundImage() != null){
            user.setBackGroundImage(updatedUser.getBackGroundImage());
        }
        if(updatedUser.getBio() != null){
            user.setBio(updatedUser.getBio());
        }
        return userRepository.save(user);
    }

    // user wants to follow followToUser
    @Override
    public User followUser(Long userId, User user) throws UserException {
        User followToUser = userRepository.findById(userId).get();

        if(followToUser == null) {
            throw new UserException("User not found with ID : " + userId);
        }

        if(user.getFollowings().contains(followToUser) && followToUser.getFollowers().contains(user)){
            user.getFollowings().remove(followToUser);
            followToUser.getFollowers().remove(user);
        }else {
            user.getFollowings().add(followToUser);
            followToUser.getFollowers().add(user);
        }

        userRepository.save(followToUser);
        userRepository.save(user);
        return followToUser;
    }

    @Override
    public List<User> searchUser(String query) throws UserException {
        return userRepository.searchUser(query);
    }
}
