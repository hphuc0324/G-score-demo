CREATE TABLE foreign_language
(
    id   VARCHAR(2) PRIMARY KEY,
    name VARCHAR(100)
);


CREATE TABLE student_scores
(
    id                   VARCHAR(8) PRIMARY KEY,
    math                 FLOAT,
    literature           FLOAT,
    foreign_language     FLOAT,
    physics              FLOAT,
    chemistry            FLOAT,
    biology              FLOAT,
    history              FLOAT,
    geography            FLOAT,
    civic_education      FLOAT,
    foreign_language_key VARCHAR(2),
    CONSTRAINT valid_math CHECK (math IS NULL OR (math >= 0 AND math <= 10)),
    CONSTRAINT valid_literature CHECK (literature IS NULL OR (literature >= 0 AND literature <= 10)),
    CONSTRAINT valid_foreign_language CHECK (foreign_language IS NULL OR
                                             (foreign_language >= 0 AND foreign_language <= 10)),
    CONSTRAINT valid_physics CHECK (physics IS NULL OR (physics >= 0 AND physics <= 10)),
    CONSTRAINT valid_chemistry CHECK (chemistry IS NULL OR (chemistry >= 0 AND chemistry <= 10)),
    CONSTRAINT valid_biology CHECK (biology IS NULL OR (biology >= 0 AND biology <= 10)),
    CONSTRAINT valid_history CHECK (history IS NULL OR (history >= 0 AND history <= 10)),
    CONSTRAINT valid_geography CHECK (geography IS NULL OR (geography >= 0 AND geography <= 10)),
    CONSTRAINT valid_civic_education CHECK (civic_education IS NULL OR (civic_education >= 0 AND civic_education <= 10)),

    CONSTRAINT fk_student_language FOREIGN KEY (foreign_language_key) REFERENCES foreign_language (id)
);



