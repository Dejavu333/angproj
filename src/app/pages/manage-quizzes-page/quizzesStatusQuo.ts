import { WritableSignal, signal } from "@angular/core";
import { QuizDTO } from "./quizDTO"

type QuizzesStatusQuo = {
    quizzes: QuizDTO[];
    status: "error" | "loading" | "done";
    error: string;
}

export const quizzesStatusQuo: WritableSignal<QuizzesStatusQuo> = signal({
    quizzes: [],
    status: "loading",
    error: "",
});