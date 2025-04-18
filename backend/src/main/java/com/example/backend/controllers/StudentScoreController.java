package com.example.backend.controllers;

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


}
