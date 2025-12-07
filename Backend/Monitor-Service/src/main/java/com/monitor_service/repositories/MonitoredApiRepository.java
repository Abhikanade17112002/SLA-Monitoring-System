package com.monitor_service.repositories;

import com.monitor_service.entities.MonitoredApi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MonitoredApiRepository extends JpaRepository<MonitoredApi,String> {

    List<MonitoredApi> findByActiveTrue();

    boolean existsByApiUrl(String apiUrl);

}
