import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {QuizDTO} from "./pages/manage-quizzes-page/model/QuizDTO";
import {QuizQuestionDTO} from "./pages/manage-quizzes-page/model/QuizQuestionDTO";
import {CategoryDTO} from "./pages/manage-quizzes-page/model/CategoryDTO";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  public readQuizzesInDS(): Observable<QuizDTO[]> {
    //fake implementation
    return of([
      new QuizDTO("some category", 0, "test1", [new QuizQuestionDTO("test?", ["test1", "test2", "test3", "test4"], [0, 1])], false, 600),
      new QuizDTO("some category", 1, "test2", [new QuizQuestionDTO("test?", ["test1", "test2", "test3"], [0])], true, 700),
      new QuizDTO("other category", 2, "test3", [new QuizQuestionDTO("test?", ["test1", "test2"], [1])], false, 800),
    ]);
  }

  public upsertQuizInDS(quiz: QuizDTO): void {
    console.log("upsert in ds:..");
  }

  public deleteQuizInDS(quiz: QuizDTO): void {
    console.log("delete in ds...");
  }

  public readCategoriesInDS():Observable<CategoryDTO[]> {
    //fake implementation
    return of([new CategoryDTO("x"),new CategoryDTO("z"),new CategoryDTO("some category"),new CategoryDTO("other category")]);
  }
}
