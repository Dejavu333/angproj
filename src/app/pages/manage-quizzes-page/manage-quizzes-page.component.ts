import { Component, OnInit } from '@angular/core';
import { QuizColumnComponent } from "./quiz-column/quiz-column.component";
import { QuizEditorComponent } from "./quiz-editor/quiz-editor.component";
import { QuizInstanceEditorComponent } from "./quiz-instance-editor/quiz-instance-editor.component";
import { QuizDTO } from './DTO';

class QuizService {
  public readQuizzesFromDataStore(): void {console.log("readQuizzesFromDataStore");}
  public createQuiz(quiz: QuizDTO): void {}
  public updateQuiz(quiz: QuizDTO): void {}
  public deleteQuiz(quiz: QuizDTO): void {}
}

@Component({
  selector: 'app-manage-quizzes-page',
  standalone: true,
  templateUrl: './manage-quizzes-page.component.html',
  styleUrl: './manage-quizzes-page.component.css',
  imports: [QuizColumnComponent, QuizEditorComponent, QuizInstanceEditorComponent]
})
export class ManageQuizzesPageComponent implements OnInit {
  public quizService: QuizService;
  public columnTitles: string[] = [];
  readonly errorMessages = {
    emptyError: "cannot be empty",
    duplicateError: "already exists"
  }

  constructor(quizService: QuizService) {
    this.quizService = quizService;
  }

  ngOnInit(): void {
    this.quizService.readQuizzesFromDataStore()
  }

}
