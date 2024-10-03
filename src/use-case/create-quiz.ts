import { IQuiz, Question, Quiz } from "@/entities/quiz";

interface CreateQuizUseCaseRequest {
  category: string;
  theme: string;
  quantity: number;
  language: string;
  questions: Question[];
}

interface CreateQuizUseCaseResponse {
  quiz: IQuiz;
}

export async function createQuiz({
  category,
  theme,
  quantity,
  language,
  questions,
}: CreateQuizUseCaseRequest): Promise<CreateQuizUseCaseResponse> {
  const quiz = new Quiz({
    category,
    theme,
    quantity,
    language,
    questions,
  });

  await quiz.save();

  return { quiz: quiz.toObject() };
}
