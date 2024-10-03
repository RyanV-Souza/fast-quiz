import { IQuiz } from "@/entities/quiz";
import OpenAI from "openai";

interface GenerateQuizUseCaseRequest {
  category: string;
  theme: string;
  quantity: number;
  language: string;
}

interface GenerateQuizUseCaseResponse {
  quiz: IQuiz;
}

export async function generateQuiz({
  category,
  theme,
  quantity,
  language,
}: GenerateQuizUseCaseRequest): Promise<GenerateQuizUseCaseResponse> {
  const openai = new OpenAI({
    apiKey:
      "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",
  });

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: [
          {
            text: 'Você será um criador de quiz. Cada pergunta deve ter 4 alternativas, sendo apenas uma delas a correta. As perguntas devem variar em dificuldade, incluindo questões fáceis, médias e difíceis. O formato JSON deve ser o seguinte: { "questions": [ { "text": "[Texto da pergunta]", "options": [ { "text": "[Alternativa A]", "isCorrect": [true ou false] }, { "text": "[Alternativa B]", "isCorrect": [true ou false] }, { "text": "[Alternativa C]", "isCorrect": [true ou false] }, { "text": "[Alternativa D]", "isCorrect": [true ou false] } ] }, // Continue para as próximas perguntas ] }',
            type: "text",
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Crie um quiz com ${quantity} perguntas sobre o tema ${theme} na categoria ${category} na língua ${language}. `,
          },
        ],
      },
    ],
    temperature: 0.7,
    max_tokens: 2048,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    response_format: {
      type: "json_object",
    },
  });

  return { quiz: response.choices[0].message.content };
}
