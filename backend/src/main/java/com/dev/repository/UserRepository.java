package com.dev.repository;

import com.dev.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository <User,Long>{

    User findByEmail(String email);

}
