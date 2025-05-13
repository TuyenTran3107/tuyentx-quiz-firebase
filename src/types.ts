export interface Question {
  id: number;
  questions: string;
  answers: string[];
  correctAnswer: number;
  topicId: number;
}

export interface Topic {
  id: number;
  name: string;
}
export interface Answer {
  questionId: number;
  answer: number;
}

export interface AnswerData {
  id: string;
  topicId: number;
  answers: Answer[];
  userId: string;
}

export interface ResultItem extends Question {
  answer?: number;
}