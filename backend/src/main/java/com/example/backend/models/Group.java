package com.example.backend.models;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public enum Group {
    A("A", List.of(Subject.MATH, Subject.PHYSICS, Subject.CHEMISTRY)),
    B("B", List.of(Subject.MATH, Subject.BIOLOGY, Subject.CHEMISTRY)),
    A1("A1", List.of(Subject.MATH, Subject.PHYSICS, Subject.FOREIGN_LANGUAGE));

    private final String groupName;
    private final List<Subject> subjects;
}
