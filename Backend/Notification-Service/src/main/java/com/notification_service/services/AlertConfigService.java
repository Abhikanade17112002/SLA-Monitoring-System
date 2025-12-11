//package com.notification_service.services;
//
//
//import com.notification_service.dtos.AlertConfigRequestDTO;
//import com.notification_service.dtos.AlertConfigResponseDTO;
//import com.notification_service.entities.AlertConfig;
//import com.notification_service.repositories.AlertConfigRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//@Service
//public class AlertConfigService {
//
//    @Autowired
//    private AlertConfigRepository alertConfigRepository ;
//
//    // CREATE or UPDATE
//    public AlertConfigResponseDTO saveOrUpdate(AlertConfigRequestDTO dto) {
//
//        AlertConfig config = alertConfigRepository
//                .findByApiId(dto.getApiId())
//                .orElse(new AlertConfig());
//
//        config.setApiId(dto.getApiId());
//        config.setOwnerEmail(dto.getOwnerEmail());
//        config.setAlertOnDown(dto.isAlertOnDown());
//        config.setAlertOnRecovered(dto.isAlertOnRecovered());
//        config.setAlertOnSlow(dto.isAlertOnSlow());
//        config.setSlowThresholdMs(dto.getSlowThresholdMs());
//
//        AlertConfig saved = alertConfigRepository.save(config);
//
//        return AlertConfigResponseDTO.builder()
//                .id(saved.getId())
//                .apiId(saved.getApiId())
//                .ownerEmail(saved.getOwnerEmail())
//                .alertOnDown(saved.isAlertOnDown())
//                .alertOnRecovered(saved.isAlertOnRecovered())
//                .alertOnSlow(saved.isAlertOnSlow())
//                .slowThresholdMs(saved.getSlowThresholdMs())
//                .build();
//    }
//
//
//    public AlertConfigResponseDTO getByApiId(String apiId) {
//        AlertConfig config = alertConfigRepository.findByApiId(apiId).orElse(null);
//        if (config == null) return null;
//
//        return AlertConfigResponseDTO.builder()
//                .id(config.getId())
//                .apiId(config.getApiId())
//                .ownerEmail(config.getOwnerEmail())
//                .alertOnDown(config.isAlertOnDown())
//                .alertOnRecovered(config.isAlertOnRecovered())
//                .alertOnSlow(config.isAlertOnSlow())
//                .slowThresholdMs(config.getSlowThresholdMs())
//                .build();
//    }
//
//
//    public void deleteByApiId(String apiId) {
//        alertConfigRepository.findByApiId(apiId)
//                .ifPresent(alertConfigRepository::delete);
//    }
//}



package com.notification_service.services;

import com.notification_service.dtos.AlertConfigRequestDTO;
import com.notification_service.dtos.AlertConfigResponseDTO;
import com.notification_service.entities.AlertConfig;
import com.notification_service.repositories.AlertConfigRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AlertConfigService {

    @Autowired
    private AlertConfigRepository alertConfigRepository;

    // CREATE or UPDATE
    public AlertConfigResponseDTO saveOrUpdate(AlertConfigRequestDTO dto) {

        AlertConfig config = alertConfigRepository
                .findByApiId(dto.getApiId())
                .orElse(new AlertConfig());

        config.setApiId(dto.getApiId());
        config.setOwnerEmail(dto.getOwnerEmail());
        config.setAlertOnDown(dto.isAlertOnDown());
        config.setAlertOnRecovered(dto.isAlertOnRecovered());
        config.setAlertOnSlow(dto.isAlertOnSlow());
        config.setSlowThresholdMs(dto.getSlowThresholdMs());

        AlertConfig saved = alertConfigRepository.save(config);

        // MANUAL CREATION (no Lombok, no builder)
        AlertConfigResponseDTO response = new AlertConfigResponseDTO();
        response.setId(saved.getId());
        response.setApiId(saved.getApiId());
        response.setOwnerEmail(saved.getOwnerEmail());
        response.setAlertOnDown(saved.isAlertOnDown());
        response.setAlertOnRecovered(saved.isAlertOnRecovered());
        response.setAlertOnSlow(saved.isAlertOnSlow());
        response.setSlowThresholdMs(saved.getSlowThresholdMs());

        return response;
    }


    public AlertConfigResponseDTO getByApiId(String apiId) {
        AlertConfig config = alertConfigRepository.findByApiId(apiId).orElse(null);
        if (config == null) return null;

        AlertConfigResponseDTO response = new AlertConfigResponseDTO();
        response.setId(config.getId());
        response.setApiId(config.getApiId());
        response.setOwnerEmail(config.getOwnerEmail());
        response.setAlertOnDown(config.isAlertOnDown());
        response.setAlertOnRecovered(config.isAlertOnRecovered());
        response.setAlertOnSlow(config.isAlertOnSlow());
        response.setSlowThresholdMs(config.getSlowThresholdMs());

        return response;
    }


    public void deleteByApiId(String apiId) {
        alertConfigRepository.findByApiId(apiId)
                .ifPresent(alertConfigRepository::delete);
    }
}
