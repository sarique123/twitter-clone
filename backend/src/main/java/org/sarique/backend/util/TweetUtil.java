package org.sarique.backend.util;

import org.sarique.backend.model.Like;
import org.sarique.backend.model.Tweet;
import org.sarique.backend.model.User;

public class TweetUtil {
    public final static Boolean isLikedByReqUser(User reqUser, Tweet tweet){
        for(Like like : tweet.getLikes()){
            if(like.getUser().getId().equals(reqUser.getId())){
                return true;
            }
        }
        return false;
    }

    public final static Boolean isRetweetedByReqUser(User reqUser, Tweet tweet){
        for(User user : tweet.getRetweetUsers()){
            if(user.getId().equals(reqUser.getId())){
                return true;
            }
        }
        return false;
    }

}
