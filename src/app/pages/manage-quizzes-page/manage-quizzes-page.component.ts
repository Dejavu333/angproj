import {Component, OnInit} from '@angular/core';
import {CategoryColumnComponent} from "./category-column/category-column.component";
import {QuizEditorComponent} from "./quiz-editor/quiz-editor.component";
import {QuizInstanceEditorComponent} from "./quiz-instance-editor/quiz-instance-editor.component";
import {QuizService} from './quiz.service';
import {RouterOutlet} from "@angular/router";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {debounceTime, distinctUntilChanged} from "rxjs";

@Component({
  selector: 'app-manage-quizzes-page',
  standalone: true,
  templateUrl: './manage-quizzes-page.component.html',
  styleUrl: './manage-quizzes-page.component.css',
  imports: [CategoryColumnComponent, QuizEditorComponent, QuizInstanceEditorComponent, RouterOutlet, ReactiveFormsModule]
})
export class ManageQuizzesPageComponent implements OnInit {
  //===========================================================================
  // properties, fields
  //===========================================================================
  // // public categoriesSig: Signal<string[]> = signal([]);
  // readonly errorMessages = {
  //   emptyError: "cannot be empty",
  //   duplicateError: "already exists"
  // }

  //src
  quizSearchControl = new FormControl('');

  //===========================================================================
  // constructors
  //===========================================================================
  constructor(public quizService: QuizService) {
    // // this.quizService.readQuizzes();

    //reducer
    this.quizSearchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(searchTerm => {
        console.log(searchTerm);
        searchTerm && this.searchQuiz(searchTerm); //should alter state and the consequence of that  should be the altered UI
      });
  }

  //===========================================================================
  // lifecycle hooks
  //===========================================================================
  ngOnInit(): void {
  }

  //===========================================================================
  // methods
  //===========================================================================
  public addCategory(): void {
    console.log("adding categoryColumn...")
  }

  public searchCategory(e: Event) {
    const searchValue: string = (e.target as HTMLInputElement).value.toLowerCase().trim();
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

  public searchQuiz(searchTerm:string) {

    //could alter the filter field in quizzesState OR
    this.quizService.searchStream.next(searchTerm);
    //overhead upon overhead

    const quizzesDOMRepres: NodeListOf<HTMLElement> = document.querySelectorAll(".quiz");
    quizzesDOMRepres.forEach(q => {
      const quizTitle: string = q.innerText.toLowerCase();
      if (searchTerm === "") {
        q.style.display = "flex";
      } else if (quizTitle.includes(searchTerm)) {
        q.style.display = "flex";
      } else {
        q.style.display = "none";
      }
    });
  }
}
