package com.example.backend.dtos;

import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.Map;

@Data
@Builder
public class StatisticDTO {
    private String subject;

    private Map<String, Long> count;
}
