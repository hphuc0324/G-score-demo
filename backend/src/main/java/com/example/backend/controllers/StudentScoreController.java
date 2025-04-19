package com.example.backend.controllers;

import com.example.backend.dtos.StatisticDTO;
import com.example.backend.dtos.TopScoreDTO;
import com.example.backend.models.StudentScore;
import com.example.backend.responses.ResponseObject;
import com.example.backend.services.StudentScoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/score")
@RequiredArgsConstructor
@CrossOrigin("*")
public class StudentScoreController {
    private final StudentScoreService studentScoreService;

    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject> getStudentScore(
            @PathVariable(name = "id") String id
    ) {

        StudentScore studentScore = studentScoreService.getStudentScore(id);

        return ResponseEntity.ok().body(
                ResponseObject.builder()
                        .message("Get score successfully")
                        .data(studentScore)
                        .status(HttpStatus.OK)
                        .build()
        );
    }

    @GetMapping("/statistic")
    public ResponseEntity<ResponseObject> getStatistic(
            @RequestParam(required = true) String subject
    ) {
        StatisticDTO statisticDTO = studentScoreService.getStatistic(subject);

        return ResponseEntity.ok().body(
                ResponseObject.builder()
                        .message("Get statistic successfully")
                        .status(HttpStatus.OK)
                        .data(statisticDTO)
                        .build()
        );
    }

    @GetMapping("/top-scores")
    public ResponseEntity<ResponseObject> getTop10(
            @RequestParam(required = true, name = "group-name") String groupName,
            @RequestParam(required = true) int limit
    ){
        TopScoreDTO results = studentScoreService.getTop(groupName, limit);

        return ResponseEntity.ok().body(
                ResponseObject.builder()
                        .message("Get top scores successfully")
                        .status(HttpStatus.OK)
                        .data(results)
                        .build()
        );
    }
}
