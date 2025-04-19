export enum Subject {
  MATH = "math",
  LITERATURE = "literature",
  CHEMISTRY = "chemistry",
  BIOLOGY = "biology",
  PHYSICS = "physics",
  FOREIGN_LANGUAGE = "foreign_language",
  HISTORY = "history",
  GEOGRAPHY = "geography",
  CIVIC_EDUCATION = "civic_education",
}

export enum Group {
  A1 = "A1",
  A = "A",
  B = "B",
}

export const GroupSubjects = [
  {
    name: "A",
    subjects: [Subject.MATH, Subject.PHYSICS, Subject.CHEMISTRY],
  },
  {
    name: "A1",
    subjects: [Subject.MATH, Subject.PHYSICS, Subject.FOREIGN_LANGUAGE],
  },
  {
    name: "B",
    subjects: [Subject.MATH, Subject.CHEMISTRY, Subject.BIOLOGY],
  },
] as const;
