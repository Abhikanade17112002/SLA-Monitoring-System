package com.monitor_service.controllers;

import com.monitor_service.dtos.*;
import com.monitor_service.entities.MonitoredApi;
import com.monitor_service.services.MonitorApiService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/monitor")
public class MonitorApiController {

    @Autowired
    private MonitorApiService monitorApiService ;

    @PostMapping("/api")
    @PreAuthorize("hasAuthority('Admin')")
    public ResponseEntity<CreateMonitorApiResponse> createNewApi(@Valid @RequestBody CreateMonitoredApiRequest request){
        return
                ResponseEntity.status(HttpStatus.CREATED)
                        .body(
                                monitorApiService.createApi( request )
                        ) ;

    }

    @DeleteMapping("/api/{apiId}")
    @PreAuthorize("hasAuthority('Admin')")
    public ResponseEntity<String> deleteApiById(@PathVariable(name = "apiId") String apiId){
        return
                ResponseEntity.status(HttpStatus.OK)
                        .body(
                                monitorApiService.deleteApiById( apiId )
                        ) ;

    }


    @PutMapping("/api/{apiId}")
    @PreAuthorize("hasAuthority('Admin')")
    public ResponseEntity<UpdateApiDetailResponse> updateApi( @PathVariable(name = "apiId" ) String apiId ,@Valid @RequestBody UpdateMonitoredApiRequest request ){
        return ResponseEntity.status(
                HttpStatus.OK
        ).body(
                monitorApiService.updateApi(apiId,request)
        ) ;
    }

    @GetMapping("/api/list")
    @PreAuthorize("hasAnyAuthority('Admin','Developer','User')")
    public ResponseEntity<List<MonitoredApi>> getAllAvailableApis(){

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("=".repeat(80));
        System.out.println("🎯 CONTROLLER ACCESS DEBUG");
        System.out.println("  • Is Authenticated: " + auth.isAuthenticated());
        System.out.println("  • Principal: " + auth.getPrincipal());
        System.out.println("  • Authorities: " + auth.getAuthorities());

        auth.getAuthorities().forEach(authority -> {
            System.out.println("    - Authority: [" + authority.getAuthority() + "]");
            System.out.println("    - Authority Class: " + authority.getClass().getName());
        });

        return ResponseEntity.status(
                HttpStatus.OK
        ).body(
                monitorApiService.getAllApis()
        ) ;
    }


    @GetMapping("/api/status/{apiId}")
    @PreAuthorize("hasAnyAuthority('Admin','Developer','User')")
    public ResponseEntity<ApiStatusResponse> getApiStatus(@PathVariable(name = "apiId") String apiId ){
        return ResponseEntity.status(HttpStatus.OK)
                .body(
                        monitorApiService.getApiStatus( apiId )
                ) ;

    }

    @GetMapping("/fetchdata/admin")
    @PreAuthorize("hasAnyAuthority('Admin','Developer','User')")
    public ResponseEntity<FetchDataResponse> getAdminData( ){
        return ResponseEntity.status(HttpStatus.OK)
                .body(
                        monitorApiService.getAdminData( )
                ) ;

    }

    @GetMapping("/{apiId}")
    @PreAuthorize("hasAnyAuthority('Admin','Developer','User')")
    public ResponseEntity<GetApiByIdResponse> getApiById( @PathVariable(name = "apiId") String apiId){
        return ResponseEntity.status(HttpStatus.OK)
                .body(
                        monitorApiService.getApiById(apiId )
                ) ;

    }

    @GetMapping("/live-dashboard-data")
    public ResponseEntity<FetchLiveDashBoardDataResponseDTO> getLiveDashboardData( ){
        return ResponseEntity.status(HttpStatus.OK)
                .body(
                        monitorApiService.getLiveDashboardData( )
                ) ;

    }




}
