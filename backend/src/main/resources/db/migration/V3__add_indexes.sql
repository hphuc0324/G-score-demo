CREATE INDEX idx_math ON student_scores (math);
CREATE INDEX idx_literature ON student_scores (literature);
CREATE INDEX idx_foreign_language ON student_scores (foreign_language);
CREATE INDEX idx_physics ON student_scores (physics);
CREATE INDEX idx_chemistry ON student_scores (chemistry);
CREATE INDEX idx_biology ON student_scores (biology);
CREATE INDEX idx_history ON student_scores (history);
CREATE INDEX idx_geography ON student_scores (geography);
CREATE INDEX idx_civic_education ON student_scores (civic_education);

CREATE INDEX idx_group_a ON student_scores (math, physics, chemistry);
CREATE INDEX idx_group_a1 ON student_scores (math, physics, foreign_language);
CREATE INDEX idx_group_b ON student_scores (math, chemistry, biology);


