package com.monitor_service.controllers;

import com.monitor_service.dtos.ApiStatusResponse;
import com.monitor_service.dtos.CreateMonitorApiResponse;
import com.monitor_service.dtos.CreateMonitoredApiRequest;
import com.monitor_service.dtos.UpdateMonitoredApiRequest;
import com.monitor_service.entities.MonitoredApi;
import com.monitor_service.services.MonitorApiService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @PutMapping("/api/{apiId}")
    @PreAuthorize("hasAuthority('Admin')")
    public ResponseEntity<String> updateApi( @PathVariable(name = "apiId" ) String apiId ,@Valid @RequestBody UpdateMonitoredApiRequest request ){
        return ResponseEntity.status(
                HttpStatus.OK
        ).body(
                monitorApiService.updateApi(apiId,request)
        ) ;
    }

    @GetMapping("/api/list")
    @PreAuthorize("hasAnyAuthority('Admin','Developer','User')")
    public ResponseEntity<List<MonitoredApi>> getAllAvailableApis(){
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



}
