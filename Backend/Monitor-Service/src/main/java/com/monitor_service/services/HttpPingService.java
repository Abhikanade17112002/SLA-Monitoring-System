package com.monitor_service.services;
import com.monitor_service.entities.MonitoredApi;
import com.monitor_service.entities.ThresholdConfig;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;


//✔ Returns success/failure
//✔ Calculates latency
//✔ Includes timeout & exceptions
//✔ Works for both fast & slow APIs
//✔ Records errors cleanly


@Service
public class HttpPingService {
    private final HttpClient httpClient = HttpClient.newBuilder()
            .version(HttpClient.Version.HTTP_2)
            .build();

    public HttpResult ping(MonitoredApi api, ThresholdConfig config) {

        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(new URI(api.getApiUrl()))
                    .timeout(Duration.ofMillis(config.getTimeoutMs()))
                    .GET()
                    .build();

            long start = System.currentTimeMillis();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            long end = System.currentTimeMillis();
            long latency = end - start;

            return HttpResult.success(response.statusCode(), latency);

        } catch (Exception ex) {
            return HttpResult.failure(ex.getMessage());
        }
    }

    // record are used to achieve immutability
    public record HttpResult(boolean isUp, Integer statusCode, Long latencyMs, String error) {

        public static HttpResult success(int statusCode, long latency) {
            return new HttpResult(true, statusCode, latency, null);
        }

        public static HttpResult failure(String error) {
            return new HttpResult(false, null, null, error);
        }
    }
}
