INSERT INTO foreign_language (id, name)
VALUES
    ('N1', 'English'),
    ('N2', 'Russian'),
    ('N3', 'French'),
    ('N4', 'Chinese'),
    ('N5', 'German'),
    ('N6', 'Japanese'),
    ('N6', 'Korean')
    ON CONFLICT (id) DO NOTHING;