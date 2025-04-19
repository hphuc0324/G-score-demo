package com.example.backend.services;

import com.example.backend.dtos.StatisticDTO;
import com.example.backend.dtos.TopScoreDTO;
import com.example.backend.exceptions.BadRequestException;
import com.example.backend.exceptions.NotFoundException;
import com.example.backend.models.Group;
import com.example.backend.models.StudentScore;
import com.example.backend.models.Subject;
import com.example.backend.repositories.StudentScoreRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudentScoreService {
    private final StudentScoreRepository studentScoreRepository;

    @PersistenceContext
    private EntityManager entityManager;

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

    public StatisticDTO getStatistic(String subject){
        if(!isValidSubject(subject)){
            throw new BadRequestException("Invalid subject");
        }

        Map<String, Long> statistic = new HashMap<>();
        statistic.put("poor",countScore(subject, 0, 4));
        statistic.put("average",countScore(subject, 4, 6));
        statistic.put("good",countScore(subject, 6, 8));
        statistic.put("excellent",countScore(subject, 8, 10.5));

        return StatisticDTO.builder()
                .subject(subject)
                .count(statistic)
                .build();
    }

    public TopScoreDTO getTop(String groupName, Integer limit) {
        Group group = getGroup(groupName);

        if(group == null){
            throw new NotFoundException("Group not found");
        }
        List<Subject> subjects = group.getSubjects();

        String s = "SELECT id, math, literature, foreign_language, physics, chemistry, biology, " +
                "history, geography, civic_education, foreign_language_key " +
                "FROM student_scores WHERE " +
                subjects.get(0).getColumnName() + " IS NOT NULL AND " +
                subjects.get(1).getColumnName() + " IS NOT NULL AND " +
                subjects.get(2).getColumnName() + " IS NOT NULL " +
                "ORDER BY (" +
                subjects.get(0).getColumnName() + " + " +
                subjects.get(1).getColumnName() + " + " +
                subjects.get(2).getColumnName() + ") DESC LIMIT :limit  OFFSET 0";

        Query query = entityManager.createNativeQuery(s, StudentScore.class);
        query.setParameter("limit", limit);
        List<StudentScore> top = query.getResultList();

        return TopScoreDTO.builder()
                .group(group)
                .topList(top.stream()
                        .map(t -> TopScoreDTO.TopScoreEntry
                                .builder()
                                .studentScore(getStudentScore(t.getId()))
                                .totalScore(getTotalScore(group, t))
                                .build()
                        ).collect(Collectors.toList()))
                .build();
    }

    private Long countScore(String subject, double min, double max){
        String s = "SELECT COUNT(DISTINCT(id)) FROM student_scores WHERE " + subject + " >= :min AND " + subject + " < :max;";
        Query query = entityManager.createNativeQuery(s);
        query.setParameter("min", min);
        query.setParameter("max", max);

        Number result = (Number) query.getSingleResult();


        return result.longValue();
    }

    private boolean isValidId(String id) {
        if(id.trim().isEmpty() || id.isBlank()) {
            return false;
        }

        return id.matches("\\d{8}");
    }

    private boolean isValidSubject(String subject) {
        if(subject.trim().isEmpty() || subject.isBlank()) {
            return false;
        }

        Subject subs = Arrays.stream(Subject.values())
                .filter(s -> s.getColumnName().equals(subject.toLowerCase()))
                .findFirst().orElse(null);
        return subs != null;
    }

    private Group getGroup(String groupName){
        if(groupName.trim().isEmpty() || groupName.isBlank()) {
            return null;
        }

        Group group = Arrays.stream(Group.values())
                .filter(g -> g.getGroupName().equals(groupName.toUpperCase()))
                .findFirst()
                .orElse(null);

        return group;
    }

   private double getTotalScore(Group group, StudentScore studentScore){
        double result;
        switch (group) {
           case A -> result = studentScore.getMath() + studentScore.getPhysics() + studentScore.getChemistry();
           case A1 -> result = studentScore.getMath() + studentScore.getPhysics() + studentScore.getForeignLanguage();
           case B -> result = studentScore.getMath() + studentScore.getChemistry() + studentScore.getBiology();
           default -> result = 0;
       };

       return Double.parseDouble(new DecimalFormat("#.##").format(result));
   }
}
