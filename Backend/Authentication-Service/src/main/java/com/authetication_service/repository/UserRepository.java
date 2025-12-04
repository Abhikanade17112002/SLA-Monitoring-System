package com.authetication_service.repository;

import com.authetication_service.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,String> {

    Optional<User> findByUserName(String userName) ;
    Optional<User> findByEmailId(String emailId ) ;

}
