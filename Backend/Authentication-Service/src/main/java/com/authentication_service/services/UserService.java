package com.authentication_service.services;
import com.authentication_service.dtos.UserSignInRequestDTO;
import com.authentication_service.dtos.UserSignInResponseDTO;
import com.authentication_service.dtos.UserSignUpRequestDTO;
import com.authentication_service.dtos.UserSignUpResponseDTO;
import com.authentication_service.entities.User;
import com.authentication_service.entities.UserRoles;
import com.authentication_service.repositories.UserRepository;
import com.authentication_service.utils.JWTUtility;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService  implements UserDetailsService {
    @Autowired
    private UserRepository userRepository ;

    @Autowired
    private PasswordEncoder bCryptPasswordEncoder ;

    @Autowired
    private UserRolesService userRolesService ;

    @Autowired
    private JWTUtility jwtUtility ;

    @Autowired
    @Lazy
    private AuthenticationManager authenticationManager ;

    public UserSignUpResponseDTO getUserSignUp(UserSignUpRequestDTO userSignUpRequestDTO) {
        System.out.println("User ==> " + userSignUpRequestDTO);


        User createdUser = getUser(
                userSignUpRequestDTO.getEmailId(),
                bCryptPasswordEncoder.encode(userSignUpRequestDTO.getPassword()),
                userSignUpRequestDTO.getFirstName(),
                userSignUpRequestDTO.getLastName(),
                userSignUpRequestDTO.getUserRoles()
        ) ;
        userRepository.save( createdUser ) ;

        return new UserSignUpResponseDTO(
                createdUser.getUserId(),
                createdUser.getUsername(),
                createdUser.getEmailId()
        )  ;
    }


    private  User getUser(String emailId , String password , String firstName , String lastName , List<String> userRoles ){
        User newUser = new User() ;

        newUser.setEmailId(emailId);
        newUser.setPassword(password);
        newUser.setFirstName(firstName);
        newUser.setLastName(lastName);
        String userName = firstName + lastName + (int) (Math.random() * 1000) ;
        newUser.setUserName(userName);

        List<UserRoles> userRolesList = userRoles
                .stream()
                .map( (role)-> userRolesService.findByRoleType( role ).get())
                .collect(Collectors.toList());


        newUser.setUserRoles(userRolesList);

        userRolesList.forEach((role)-> role.getUserList().add(newUser));

        return newUser ;

    }

    public UserSignInResponseDTO getUserSignIn(UserSignInRequestDTO userSignInRequestDTO) {

        System.out.println("Received Request ==> " + userSignInRequestDTO );

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        userSignInRequestDTO.getEmailId() ,
                        userSignInRequestDTO.getPassword()
                )

        );

        User user = (User) authentication.getPrincipal() ;

        System.out.println("Retrived User ==> " + user) ;

        String generatedToken = jwtUtility.createToken(user) ;

        System.out.println("Generated Token ==> " + generatedToken);

        return new UserSignInResponseDTO(
                        user.getEmailId(),
                generatedToken

        ) ;




    }

    @Override
    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmailId(username).orElseThrow(()->new UsernameNotFoundException("User With Email Id ==> "+ username + " Not Found"));
    }

    public User getUserById(String userId) {
        return userRepository.findById(userId).orElseThrow(()-> new EntityNotFoundException("User With User Id ==>  " + userId + " Not Found"));
    }
}
