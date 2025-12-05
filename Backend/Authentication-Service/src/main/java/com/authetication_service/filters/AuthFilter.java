package com.authetication_service.filters;

import com.authetication_service.entities.User;
import com.authetication_service.repository.UserRepository;
import com.authetication_service.utility.JWTUtility;
import io.jsonwebtoken.Claims;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
@Component
public class AuthFilter extends OncePerRequestFilter {

    @Autowired
    @Lazy
    private AuthenticationManager authenticationManager ;

    @Autowired
    private JWTUtility jwtUtility ;

    @Autowired
    private UserRepository userRepository ;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
      String authenticationHeader = request.getHeader("Authorization") ;


        System.out.println(" authenticationHeader ==> " + authenticationHeader);

      if( authenticationHeader == null  || !authenticationHeader.startsWith("Bearer") ){

          // Token IS Null Or Does Not Starts With Bearer
          filterChain.doFilter(request,response);
          return;

      }

      String token = authenticationHeader.split(" ")[1] ;

       System.out.println("Received Token ==> " + token );
       String userId  =  jwtUtility.extractUserId( token ) ;

        System.out.println(" Retrieved UserId From Token  ==> " + userId );

        User retrivedUser = userRepository
                .findById( userId )
                .orElseThrow(()-> new EntityNotFoundException("USer With User Id ==> " + userId + " Not Found "));


        System.out.println("Retrieved User ==> " + retrivedUser );

        if( retrivedUser != null && SecurityContextHolder.getContext().getAuthentication() == null ){
            //Create an Authentication Token
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(retrivedUser, null, retrivedUser.getAuthorities());  //put the user in spring security context holder and in other field we used 'null' for only testing purpose
            System.out.println("Authrotities ==> " + retrivedUser.getAuthorities());
            //Set Authentication Details
            authenticationToken.setDetails(
                    new WebAuthenticationDetailsSource().buildDetails(request)
            );
            //Set Authentication in Security Context
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }


        filterChain.doFilter(request,response);



    }
}
