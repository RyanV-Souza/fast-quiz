import { model, ObjectId, Schema } from "mongoose";

export type Option = {
  id: ObjectId;
  text: string;
  isCorrect: boolean;
};

export type Question = {
  id: ObjectId;
  text: string;
  options: Option[];
};

export interface IQuiz {
  id: ObjectId;
  theme: string;
  category: string;
  quantity: number;
  questions: Question[];
  createdAt: Date;
}

const QuizSchema = new Schema({
  theme: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 5,
  },
  questions: [
    {
      text: { type: String, required: true },
      options: [
        {
          text: { type: String, required: true },
          isCorrect: { type: Boolean, required: true },
        },
      ],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Quiz = model<IQuiz>("Quiz", QuizSchema);
