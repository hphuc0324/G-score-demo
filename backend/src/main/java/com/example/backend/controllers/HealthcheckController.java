package com.example.backend.controllers;

import com.example.backend.responses.ResponseObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${api.prefix}/healthcheck")
public class HealthcheckController {
    @GetMapping()
    public ResponseEntity<ResponseObject> healthcheck() {
        return ResponseEntity.ok()
                .body(
                        ResponseObject.builder()
                                .message("OK")
                                .status(HttpStatus.OK)
                                .data(null)
                                .build()
                );

    }
}
