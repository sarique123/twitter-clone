package org.sarique.backend.util;

import org.sarique.backend.model.User;

public class UserUtil {

    public static final Boolean isReqUser(User reqUser, User user2){
        return reqUser.getId().equals(user2.getId());
    }

    public static final Boolean isFollowedByReqUser(User reqUser,User user2){
        return reqUser.getFollowings().contains(user2);
    }
}
