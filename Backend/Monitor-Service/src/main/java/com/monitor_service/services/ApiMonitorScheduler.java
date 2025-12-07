package com.monitor_service.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ApiMonitorScheduler {

    @Autowired
    private MonitorCoreService monitorCoreService ;


    @Scheduled( fixedRate = 30000 ) // Runs Every 30 Seconds
    public void run(){
        monitorCoreService.monitorAllApis();
    }

}
