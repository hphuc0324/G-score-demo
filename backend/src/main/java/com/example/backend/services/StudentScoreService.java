package com.example.backend.services;

import com.example.backend.exceptions.BadRequestException;
import com.example.backend.exceptions.NotFoundException;
import com.example.backend.models.StudentScore;
import com.example.backend.repositories.StudentScoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StudentScoreService {
    private final StudentScoreRepository studentScoreRepository;

    public StudentScore getStudentScore(String id){
        if(!isValidId(id)){
            throw new BadRequestException("Invalid registration id");
        }

        Optional<StudentScore> student = studentScoreRepository.findById(id);

        if(student.isEmpty()){
            throw new NotFoundException("Student not found");
        }

        return student.get();
    }

    private boolean isValidId(String id) {
        if(id.trim().isEmpty() || id.isBlank()) {
            return false;
        }

        return id.matches("\\d{8}");
    }
}
