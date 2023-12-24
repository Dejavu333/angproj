import { Injectable, Signal, WritableSignal, computed, effect, signal } from "@angular/core";
import { QuizDTO} from "./quizDTO";
import { QuizQuestionDTO } from "./quizQuestionDTO";
import {BehaviorSubject, Observable, of} from 'rxjs';

export @Injectable({ providedIn: 'root' })
class QuizService {
  // fields, properties
  //--------------------------------------------------------------
  public quizzesSig: WritableSignal<QuizDTO[]>;
  public categoriesSig: Signal<string[]>;
  public searchStream = new BehaviorSubject<string>("");

  // constructors
  //--------------------------------------------------------------
  constructor() {
    // 3.status quo
    this.quizzesSig = signal([]);

    // 4.deriveds
    this.categoriesSig = computed(() => { // categoriesSig derived from quizzesSig
      return this.quizzesSig().map((quiz) => { return quiz.category }) // get category from each quiz
        .filter((currentCategory, ind, arr) => { return arr.indexOf(currentCategory) == ind }); // remove duplicates
    });

    // 1.sources
    let quizzesStream = this.readQuizzesInDS();

    // 2.reducers (sources -> status quo)
    quizzesStream.subscribe((quizzes)=>{
      this.quizzesSig.set(quizzes);
    });

    // 5.reactions
    effect(() => { console.log("quizzes: ",this.quizzesSig()) });
    effect(() => { console.log("catgegories: ",this.categoriesSig()) });
    //+ some rendering int he html that to reflect the changes in the data

  }

  // methods
  //--------------------------------------------------------------
  // public readQuizzes() {
  //   this.readQuizzesInDS().subscribe((quizzes) => {
  //     this.quizzesSig.set(quizzes);
  //   });
  // }

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

  private readQuizzesInDS(): Observable<QuizDTO[]> {
    //fake implementation
    return of([
      new QuizDTO("some category", 0, "test1", [new QuizQuestionDTO("test?", ["test1", "test2", "test3", "test4"], [0,1])], false, 600),
      new QuizDTO("some category", 1, "test2", [new QuizQuestionDTO("test?", ["test1", "test2", "test3"         ], [0  ])], true,  700),
      new QuizDTO("other category", 2, "test3", [new QuizQuestionDTO("test?", ["test1", "test2"                  ], [1  ])], false, 800),
    ]);
  }

  // private upsertQuizInDS(quiz: QuizDTO): void {

  // }

  // private deleteQuizInDS(quiz: QuizDTO): void {

  // }
}
