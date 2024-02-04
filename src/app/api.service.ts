import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { Group, QuizDTO } from "./pages/manage-quizzes-page/model/QuizDTO";
import { QuizQuestionDTO } from "./pages/manage-quizzes-page/model/QuizQuestionDTO";
import { CategoryDTO } from "./pages/manage-quizzes-page/model/CategoryDTO";
import { genTempID } from './pages/manage-quizzes-page/quiz-editor/quiz-editor.component';
import { QuizOptionDTO } from './pages/manage-quizzes-page/model/QuizOptionDTO';
import { Constants } from './app.constants';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor() { }

    public readQuizzesInDS(): Observable<QuizDTO[]> {
        //fake implementation
        return of([
            new QuizDTO(
                genTempID("quiz-"),
                "some category",  
                0, 
                "testQuizX", 
                [
                    new QuizQuestionDTO(
                        "testQuestionX?", 
                        [
                            new QuizOptionDTO(genTempID("option-"),"asdA", 3), 
                            new QuizOptionDTO(genTempID("option-"),"asdX", 2), 
                            new QuizOptionDTO(genTempID("option-"),"asdY", 1), 
                            new QuizOptionDTO(genTempID("option-"),"asdZ", 0)
                        ], 
                        [],
                        false,
                        1,
                        1,
                        "",
                        false,
                    ),
                    new QuizQuestionDTO(
                        "testQuestionY?", 
                        [
                            new QuizOptionDTO(genTempID("option-"),"test1", 0), 
                            new QuizOptionDTO(genTempID("option-"),"test2", 1), 
                            new QuizOptionDTO(genTempID("option-"),"test3", 2), 
                            new QuizOptionDTO(genTempID("option-"),"test4", 3)
                        ], 
                        [],
                        false,
                        0,
                        1,
                        "",
                        false, 
                    ),
                ], 
                false, 
                600,
                [new Group("red",1)]
            ),

            new QuizDTO(genTempID("quiz-"), "some category", 1, "test2", [new QuizQuestionDTO("test?", [new QuizOptionDTO(genTempID("option-"), "test1", 0), new QuizOptionDTO(genTempID("option-"), "test1", 1), new QuizOptionDTO(genTempID("option-"), "test1", 2)], [], false, 1, 1, "", false)], true, 700, [new Group("green", 1), new Group(Constants.DEFAULT_GROUP_COLOR_VALUE, Math.max())]),
            new QuizDTO(genTempID("quiz-"),"other category", 2, "test3", [new QuizQuestionDTO("test?", [new QuizOptionDTO(genTempID("option-"), "test1", 0), new QuizOptionDTO(genTempID("option-"), "test1", 1)], [], false, 2, 1, "", false)], false, 800, [new Group("blue", 1), new Group(Constants.DEFAULT_GROUP_COLOR_VALUE, Math.max())]),
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
