export interface StudentScore {
  id: string;
  math: number;
  literature: number;
  chemistry: number;
  biology: number;
  physics: number;
  foreignLanguage: number;
  history: number;
  geography: number;
  civicEducation: number;
  language: Language;
}

export interface Language {
  id: string;
  name: string;
}

export interface Statistic {
  poor: number;
  average: number;
  good: number;
  excellent: number;
}

export interface TopScore {
  studentScore: StudentScore;
  totalScore: number;
}
