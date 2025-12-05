package com.authetication_service.service;

import com.authetication_service.controllers.UserSignInRequestDTO;
import com.authetication_service.controllers.UserSignInResponseDTO;
import com.authetication_service.dtos.UserSignUpRequestDTO;
import com.authetication_service.dtos.UserSignUpResponseDTO;
import com.authetication_service.entities.Role;
import com.authetication_service.entities.User;
import com.authetication_service.enums.UserRole;
import com.authetication_service.repository.RoleRepository;
import com.authetication_service.repository.UserRepository;
import com.authetication_service.utility.JWTUtility;
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

@Service
public class UserService  implements UserDetailsService {

    @Autowired
    private JWTUtility jwtUtility ;

    @Autowired
    @Lazy
    private AuthenticationManager authenticationManager ;

    @Autowired
    private PasswordEncoder bCryptPasswordEncoder ;

    @Autowired
    private UserRepository userRepository ;

    @Autowired
    private RoleRepository roleRepository ;

    @Override
    public UserDetails loadUserByUsername(String emailId) throws UsernameNotFoundException {
        return userRepository.findByEmailId(emailId)
                .orElseThrow(()-> new EntityNotFoundException("User With Email Id ==> " + emailId + " Not Found"));
    }


    public static UserRole getUserRoleFromUser( String userRole ){

        UserRole role = null ;

        switch ( userRole ){
            case "ADMIN" : role = UserRole.ADMIN ;
            break ;

            case "USER" : role = UserRole.USER ;
            break ;

            case "DEVELOPER" : role = UserRole.DEVELOPER ;
            break;

            default: role = null;
            break ;
        }

        return role ;

    }

    public UserSignUpResponseDTO getUserSignUp(UserSignUpRequestDTO user) {

        System.out.println("Received User ==> " + user);


        String userName = user.getFirstName() + user.getLastName() + (int) (Math.random()*99999 );
        System.out.println("Generated User Name ==> " + userName);

        User newUser = new User() ;

        Role retrivedRole = roleRepository
                .findByUserRole(   getUserRoleFromUser(   user.getRole()  )   )
                .orElseThrow(()-> new EntityNotFoundException("User Role With Name ==> " + user.getRole() + " Not Found"));

        System.out.println("Retrived Role ==> " + retrivedRole );

        newUser.setUserName(userName);
        newUser.setRole( retrivedRole );
        newUser.setEmailId(user.getEmailId());
        newUser.setPassword( bCryptPasswordEncoder.encode( user.getPassword()) );
        newUser.setFirstName( user.getFirstName());
        newUser.setLastName( user.getLastName());


        User savedUser = userRepository.save( newUser ) ;

        System.out.println("Saved User ==> " + savedUser);

        UserSignUpResponseDTO response = new UserSignUpResponseDTO(
                savedUser.getUserId() ,
                savedUser.getUserName() ,
                savedUser.getEmailId() ,
                savedUser.getRole().getUserRole().getUserRole()
        ) ;

        return response ;
    }

    public UserSignInResponseDTO getUserSignIn(UserSignInRequestDTO user) {

        System.out.println("Received User Request ==>  " + user );

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getEmailId() ,
                        user.getPassword()
                )
        );

        System.out.println("authentication ==> " + authentication);

        User authenticatedUser = (User) authentication.getPrincipal() ;

        System.out.println("authenticatedUser ==> " + authenticatedUser );


        String authJwtToken = jwtUtility.generateToken( authenticatedUser );

        System.out.println(" authJwtToken ==> " + authJwtToken );

        UserSignInResponseDTO response = new UserSignInResponseDTO() ;

        response.setUserId( authenticatedUser.getUserId() ) ;
        response.setJwtToken( "Bearer " + authJwtToken );


        return response ;

    }
}
