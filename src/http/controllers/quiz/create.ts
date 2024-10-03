import { createQuiz } from "@/use-case/create-quiz";
import { LimitExcedeedError } from "@/http/controllers/error/limit-excedeed";
import { getUser } from "@/use-case/get-user";
import { verifyDailyLimit } from "@/use-case/verify-daily-limit";
import dayjs from "dayjs";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createQuizBodySchema = z.object({
    category: z.string(),
    theme: z.string(),
    quantity: z.number(),
    language: z.string(),
    quantity: z.number(),
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

  const { quiz: createdQuiz } = await createQuiz({
    category,
    theme,
    quantity,
    language,
  });

  return reply.status(201).send();
}
