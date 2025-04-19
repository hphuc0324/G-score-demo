package com.example.backend.repositories;

import com.example.backend.models.StudentScore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentScoreRepository extends JpaRepository<StudentScore, String> {
    @Query(value = ":query" , nativeQuery = true)
    Long countByScoreRange(@Param("query") String query);
}
