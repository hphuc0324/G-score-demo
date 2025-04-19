package com.example.backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;


@AllArgsConstructor
@Getter
public enum Subject {
    MATH("math", "Math"),
    LITERATURE("literature", "Literature"),
    FOREIGN_LANGUAGE("foreign_language", "Foreign Language"),
    PHYSICS("physics", "Physics"),
    CHEMISTRY("chemistry", "Chemistry"),
    BIOLOGY("biology", "Biology"),
    HISTORY("history", "History"),
    GEOGRAPHY("geography", "Geography"),
    CIVIC_EDUCATION("civic_education", "Civic Education");

    private final String columnName;
    private final String displayName;

}
