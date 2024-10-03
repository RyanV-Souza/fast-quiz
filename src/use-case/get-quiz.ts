import { IQuiz, Quiz } from "@/entities/quiz";
import { ResourceNotFoundError } from "./errors/resource-not-found";

export interface GetQuizUseCaseRequest {
  theme: string;
  category: string;
  quantity: number;
  language: string;
}

export interface GetQuizUseCaseResponse {
  quiz: IQuiz;
}

export async function getQuiz({
  theme,
  category,
  quantity,
  language,
}: GetQuizUseCaseRequest): Promise<GetQuizUseCaseResponse> {
  const quiz = await Quiz.findOne({
    theme,
    category,
    quantity,
    language,
  });

  if (!quiz) {
    throw new ResourceNotFoundError();
  }

  return { quiz };
}
