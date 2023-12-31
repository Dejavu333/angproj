import { CategoryDTO } from "./CategoryDTO";
import { Filter } from "./Filter";
import { QuizDTO } from "./QuizDTO";

export type QuizzesState = {
    //===========================================================================
    // properties, fields
    //===========================================================================
    quizzes: QuizDTO[];
    categories: CategoryDTO[];
    filters: Map<string, Filter>;
    status: "loading" | "error" | "done";
}