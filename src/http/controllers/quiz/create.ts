import { createQuiz } from "@/use-case/create-quiz";
import { LimitExcedeedError } from "@/http/controllers/error/limit-excedeed";
import { getUser } from "@/use-case/get-user";
import dayjs from "dayjs";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { getQuiz } from "@/use-case/get-quiz";
import { generateQuestions } from "@/use-case/generate-questions";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createQuizBodySchema = z.object({
    category: z.string(),
    theme: z.string(),
    quantity: z.number(),
    language: z.string(),
  });

  const { theme, category, quantity, language } = createQuizBodySchema.parse(
    request.body,
  );

  const id = request.user.sub;

  const { user } = await getUser({ id });

  const filteredAnswers = user.quizzesAnswered.filter((answer) =>
    dayjs().isSame(answer.dateAnswered, "day"),
  );

  if (filteredAnswers.length >= user.dailyLimit) {
    throw new LimitExcedeedError();
  }

  if (user.accountType === "FREE" && quantity > 1) {
    throw new LimitExcedeedError();
  }

  const { quiz } = await getQuiz({ theme, category, quantity, language });

  if (
    !user.quizzesAnswered.find((answer) => answer.quizId === quiz.id.toString())
  ) {
    return reply.status(200).send({ quiz });
  }

  const { questions } = await generateQuestions({
    category,
    theme,
    quantity,
    language,
  });

  const { quiz: createdQuiz } = await createQuiz({
    category,
    theme,
    quantity,
    language,
    questions,
  });

  return reply.status(200).send({ quiz: createdQuiz });
}
