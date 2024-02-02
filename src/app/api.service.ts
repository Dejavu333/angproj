import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { QuizDTO } from "./pages/manage-quizzes-page/model/QuizDTO";
import { QuizOptionDTO, QuizQuestionDTO } from "./pages/manage-quizzes-page/model/QuizQuestionDTO";
import { CategoryDTO } from "./pages/manage-quizzes-page/model/CategoryDTO";

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor() { }

    public readQuizzesInDS(): Observable<QuizDTO[]> {
        //fake implementation
        return of([
            new QuizDTO(
                "some category",  
                0, 
                "testQuizX", 
                [
                    new QuizQuestionDTO(
                        "testQuestionX?", 
                        [
                            new QuizOptionDTO("asdA", 3), 
                            new QuizOptionDTO("asdX", 2), 
                            new QuizOptionDTO("asdY", 1), 
                            new QuizOptionDTO("asdZ", 0)
                        ], 
                        [0, 1],
                        false,
                        1,
                        1
                    ),
                    new QuizQuestionDTO(
                        "testQuestionY?", 
                        [
                            new QuizOptionDTO("test1", 0), 
                            new QuizOptionDTO("test2", 1), 
                            new QuizOptionDTO("test3", 2), 
                            new QuizOptionDTO("test4", 3)
                        ], 
                        [0, 1],
                        false,
                        0,
                        1
                    ),
                ], 
                false, 
                600
            ),

            new QuizDTO("some category", 1, "test2", [new QuizQuestionDTO("test?", [new QuizOptionDTO("test1", 0), new QuizOptionDTO("test1", 1), new QuizOptionDTO("test1", 2)], [0], false, 1, 1)], true, 700),
            new QuizDTO("other category", 2, "test3", [new QuizQuestionDTO("test?", [new QuizOptionDTO("test1", 0), new QuizOptionDTO("test1", 1)], [1], false, 2, 1)], false, 800),
        ]);
    }

    public upsertQuizInDS(quiz: QuizDTO): void {
        console.log("upsert in ds:..");
    }

    public deleteQuizInDS(quiz: QuizDTO): void {
        console.log("delete in ds...");
    }

    public readCategoriesInDS(): Observable<CategoryDTO[]> {
        //fake implementation
        return of([new CategoryDTO("x"), new CategoryDTO("z"), new CategoryDTO("some category"), new CategoryDTO("other category")]);
    }
}
