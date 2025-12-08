package com.monitor_service.dtos;

public class CreateMonitorApiResponse {

    private String apiId ;

    private String apiUrl ;

    private String apiName ;

    public CreateMonitorApiResponse() {
    }

    public CreateMonitorApiResponse(String apiId, String apiUrl, String apiName) {
        this.apiId = apiId;
        this.apiUrl = apiUrl;
        this.apiName = apiName;
    }

    public String getApiId() {
        return apiId;
    }

    public void setApiId(String apiId) {
        this.apiId = apiId;
    }

    public String getApiUrl() {
        return apiUrl;
    }

    public void setApiUrl(String apiUrl) {
        this.apiUrl = apiUrl;
    }

    public String getApiName() {
        return apiName;
    }

    public void setApiName(String apiName) {
        this.apiName = apiName;
    }

    @Override
    public String toString() {
        return "CreateMonitorApiResponse{" +
                "apiId='" + apiId + '\'' +
                ", apiUrl='" + apiUrl + '\'' +
                ", apiName='" + apiName + '\'' +
                '}';
    }
}
