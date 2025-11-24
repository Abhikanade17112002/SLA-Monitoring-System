package com.authentication_service.filters;

import com.authentication_service.entities.User;
import com.authentication_service.services.JWTService;
import com.authentication_service.services.UserService;
import com.authentication_service.utils.JWTUtility;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JWTAuthFilter extends OncePerRequestFilter {

    private final JWTUtility jwtUtility;
    private final UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {


        final String requestTokenHeader = request.getHeader("Authorization"); //Extract the Authorization Header:

        //this token is actually concatinated with Bearer space("Bearer ")
        //Check for a Bearer Token:
        if(requestTokenHeader == null || !requestTokenHeader.startsWith("Bearer ")){
            filterChain.doFilter(request,response);
            return;
        }

        //Ensure that the token in the header is correctly formatted as "Bearer <your-jwt-token>".
        String token = requestTokenHeader.split("Bearer ")[1]; // Extract JWT token from the header
        String userId = jwtUtility.extractUserId(token); //generate the token
        System.out.println("UserID ==> + "+ userId);
        //Check if userId is Present and the Security Context is Empty
        if(userId != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            //Retrieve the User Entity
            User user = userService.getUserById(userId);

            //Create an Authentication Token
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());  //put the user in spring security context holder and in other field we used 'null' for only testing purpose

            //Set Authentication Details
            authenticationToken.setDetails(
                    new WebAuthenticationDetailsSource().buildDetails(request)
            );
            //Set Authentication in Security Context
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }
        //Continue the Filter Chain
        filterChain.doFilter(request,response);
    }
}
