package com.dev.service;

import com.dev.model.User;

public interface UserService {
    User findUserProfileByJwt(String jwt)throws Exception;

    User findUserByEmail(String email)throws Exception;

    User findUserById(Long userId)throws Exception;

    User updateUsersProijectSize(User user,int number);
}
