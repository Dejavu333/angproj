import { Component, Injectable, OnInit, WritableSignal, signal } from '@angular/core';
import { QuizColumnComponent } from "./quiz-column/quiz-column.component";
import { QuizEditorComponent } from "./quiz-editor/quiz-editor.component";
import { QuizInstanceEditorComponent } from "./quiz-instance-editor/quiz-instance-editor.component";
import { QuizDTO, QuizQuestionDTO } from './DTO';

@Injectable({ providedIn: 'root' })
class QuizService {
  // fields, properties
  //--------------------------------------------------------------
  public quizzesSig: WritableSignal<QuizDTO[]> = signal([]);

  // constructors
  //--------------------------------------------------------------
  constructor() { }

  // methods
  //--------------------------------------------------------------
  public readQuizzes() {
    this.quizzesSig.set(this.readQuizzesInDS());
  }

  public upsertQuiz(quiz: QuizDTO): void {
    // optimistic approach
    // update UI
    const alreadyExists:boolean = this.quizzesSig().includes(quiz);
    if (alreadyExists) {
      this.quizzesSig.update((quizzes) => { return quizzes.map((q) => { return q == quiz ? quiz : q }) }); // or splice but map is more performant this.quizzesSig.update((quizzes) => { return quizzes.splice(quizzes.indexOf(quiz), 1, quiz) });
    }
    else if (!alreadyExists) {
      this.quizzesSig.update((quizzes) => { return [...quizzes, quiz] });
    }
    // update data store
  }

  public deleteQuiz(quiz: QuizDTO): void {
    // optimistic approach
    // update UI
    this.quizzesSig.update((quizzes) => { return quizzes.filter((q) => { return q != quiz }) }); // or splice but filter is more performant this.quizzesSig.update((quizzes) => { return quizzes.splice(quizzes.indexOf(quiz), 1) });
    // update data store
  }

  private readQuizzesInDS(): QuizDTO[] {
    //fake implementation
    return [
      new QuizDTO("test", 2, "test1", [new QuizQuestionDTO("test?", ["test1", "test2", "test3"], [])], false, 600),
      new QuizDTO("test", 2, "test2", [new QuizQuestionDTO("test?", ["test1", "test2", "test3"], [])], false, 600),
      new QuizDTO("test", 2, "test3", [new QuizQuestionDTO("test?", ["test1", "test2", "test3"], [])], false, 600),
    ];
  }
  private upsertQuizInDS(quiz: QuizDTO): void { }
  private deleteQuizInDS(quiz: QuizDTO): void { }
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
    this.quizService.readQuizzes()
  }

}
