package com.example.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "student_scores")
public class StudentScore {

    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "math")
    private Float math;

    @Column(name = "literature")
    private Float literature;

    @Column(name = "foreign_language")
    private Float foreignLanguage;

    @Column(name = "physics")
    private Float physics;

    @Column(name = "chemistry")
    private Float chemistry;

    @Column(name = "biology")
    private Float biology;

    @Column(name = "history")
    private Float history;

    @Column(name = "geography")
    private Float geography;

    @Column(name = "civic_education")
    private Float civicEducation;

    @ManyToOne
    @JoinColumn(name = "foreign_language_key", referencedColumnName = "id")
    private Language language;
}
