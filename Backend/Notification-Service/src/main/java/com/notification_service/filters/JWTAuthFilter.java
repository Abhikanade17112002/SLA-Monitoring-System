package com.notification_service.filters;


import com.notification_service.utility.JWTUtility;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class JWTAuthFilter extends OncePerRequestFilter {

    @Autowired
    private JWTUtility jwtUtility ;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String authorizationHeader = request.getHeader("Authorization") ;

        if( authorizationHeader == null || !authorizationHeader.startsWith("Bearer ") ){
            filterChain.doFilter(request,response);
            return ;
        }

        System.out.println("AuthorizationHeader ==> " + authorizationHeader);

        String retrivedToken = authorizationHeader.split(" ")[1] ;

        System.out.println("Reterived Token ==> " + retrivedToken );


        String extractedRole = jwtUtility.extractRole( retrivedToken ) ;
        System.out.println("Extracted Role ==> " + extractedRole );


        if( extractedRole != null && SecurityContextHolder.getContext().getAuthentication() == null ){
            SimpleGrantedAuthority simpleGrantedAuthority = new SimpleGrantedAuthority(extractedRole) ;
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    null ,null , Collections.singleton(simpleGrantedAuthority)
            ) ;


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
