package com.monitor_service.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class ApiMonitorScheduler {

    @Autowired
    private MonitorCoreService monitorCoreService ;

//3600000
    @Scheduled( fixedRate =  60000 ) // Runs Every 1 hour Seconds
    public void run(){
        System.out.println("🔄 Scheduler Triggered at: " + LocalDateTime.now());
        monitorCoreService.monitorAllApis();
    }

}
