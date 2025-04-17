package com.example.backend.responses;

import lombok.Builder;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
@Builder
public class ResponseObject {
    private HttpStatus status;
    private String message;
    private Object data;
}
