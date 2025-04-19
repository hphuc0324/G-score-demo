package com.example.backend.dtos;

import com.example.backend.models.Group;
import com.example.backend.models.StudentScore;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@Builder
public class TopScoreDTO {
    private Group group;
    private List<TopScoreEntry> topList;

    @Data
    @AllArgsConstructor
    @Builder
    public static class TopScoreEntry {
        private StudentScore studentScore;
        @JsonFormat(shape = JsonFormat.Shape.NUMBER, pattern = "#0.00")
        private double totalScore;
    }
}
