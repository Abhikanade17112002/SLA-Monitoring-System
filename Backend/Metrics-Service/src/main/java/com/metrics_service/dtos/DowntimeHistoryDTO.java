package com.metrics_service.dtos;

import java.time.LocalDateTime;

public class DowntimeHistoryDTO {

    private LocalDateTime start;
    private LocalDateTime end;
    private long durationMinutes;

    public DowntimeHistoryDTO() {
    }

    public DowntimeHistoryDTO(LocalDateTime start, LocalDateTime end, long durationMinutes) {
        this.start = start;
        this.end = end;
        this.durationMinutes = durationMinutes;
    }

    public LocalDateTime getStart() { return start; }
    public LocalDateTime getEnd() { return end; }
    public long getDurationMinutes() { return durationMinutes; }

    public void setStart(LocalDateTime start) {
        this.start = start;
    }

    public void setEnd(LocalDateTime end) {
        this.end = end;
    }

    public void setDurationMinutes(long durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    @Override
    public String toString() {
        return "DowntimeHistoryDTO{" +
                "start=" + start +
                ", end=" + end +
                ", durationMinutes=" + durationMinutes +
                '}';
    }
}
