import { Component, OnInit } from '@angular/core';
import { CategoryColumnComponent } from "./category-column/category-column.component";
import { QuizEditorComponent } from "./quiz-editor/quiz-editor.component";
import { QuizInstanceEditorComponent } from "./quiz-instance-editor/quiz-instance-editor.component";
import { QuizService } from './quiz.service';

@Component({
  selector: 'app-manage-quizzes-page',
  standalone: true,
  templateUrl: './manage-quizzes-page.component.html',
  styleUrl: './manage-quizzes-page.component.css',
  imports: [CategoryColumnComponent, QuizEditorComponent, QuizInstanceEditorComponent]
})
export class ManageQuizzesPageComponent implements OnInit {
  // // public categoriesSig: Signal<string[]> = signal([]);
  readonly errorMessages = {
    emptyError: "cannot be empty",
    duplicateError: "already exists"
  }

  constructor(public quizService: QuizService) {
    // // this.quizService.readQuizzes();

  }

  ngOnInit(): void {
  }

}
