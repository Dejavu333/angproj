import {Component, OnInit} from '@angular/core';
import {CategoryColumnComponent} from "./category-column/category-column.component";
import {QuizEditorComponent} from "./quiz-editor/quiz-editor.component";
import {QuizInstanceEditorComponent} from "./quiz-instance-editor/quiz-instance-editor.component";
import {QuizService} from './quiz.service';

@Component({
  selector: 'app-manage-quizzes-page',
  standalone: true,
  templateUrl: './manage-quizzes-page.component.html',
  styleUrl: './manage-quizzes-page.component.css',
  imports: [CategoryColumnComponent, QuizEditorComponent, QuizInstanceEditorComponent]
})
export class ManageQuizzesPageComponent implements OnInit {
  // // public categoriesSig: Signal<string[]> = signal([]);
  // readonly errorMessages = {
  //   emptyError: "cannot be empty",
  //   duplicateError: "already exists"
  // }

  constructor(public quizService: QuizService) {
    // // this.quizService.readQuizzes();
  }

  ngOnInit(): void {
  }

  public addCategory(): void {
    console.log("adding categoryColumn...")
  }

  public searchCategory() {
    const searchValue: string = (<HTMLInputElement>document.querySelector("#searchCategoryInp"))?.value.toLowerCase().trim();
    const columnsDOMRepres: NodeListOf<HTMLElement> = document.querySelectorAll(".category-column");

    columnsDOMRepres.forEach(c => {
      const ulElement: HTMLElement | null = c.querySelector("ul");
      if (ulElement instanceof HTMLElement) {
        const ulId: string = ulElement.id.toLowerCase();
        if (searchValue === "" || ulId.includes(searchValue)) {
          c.style.display = "block";
        } else {
          c.style.display = "none";
        }
      }
    });
  }

  public searchQuiz() {

  }

  protected readonly InputEvent = InputEvent;
}
