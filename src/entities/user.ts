import { Schema, model } from "mongoose";

export type QuizAnswer = {
  quizId: string;
  dateAnswered: Date;
};

export interface IUser {
  name: string;
  email: string;
  password: string;
  accountType: string;
  dailyLimit: number;
  lastDailyReset: Date;
  quizzesAnswered: QuizAnswer[];
}

// Enum para definir o tipo de conta do usuário
const AccountTypeEnum = ["FREE", "MEMBER"] as const;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    enum: AccountTypeEnum,
    default: "FREE",
  },
  dailyLimit: {
    type: Number,
    default: 1,
  },
  lastDailyReset: {
    type: Date,
    default: Date.now,
  },
  quizzesAnswered: [
    {
      quizId: { type: Schema.Types.ObjectId, ref: "Quiz" },
      dateAnswered: { type: Date, default: Date.now },
    },
  ],
});

export const User = model<IUser>("User", UserSchema);
