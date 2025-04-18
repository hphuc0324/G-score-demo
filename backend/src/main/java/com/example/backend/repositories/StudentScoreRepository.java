package com.example.backend.repositories;

import com.example.backend.models.StudentScore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentScoreRepository extends JpaRepository<StudentScore, String> {

}
