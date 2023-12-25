import {Injectable, Signal, WritableSignal, computed, effect, signal} from "@angular/core";
import {QuizDTO} from "./quizDTO";
import {QuizQuestionDTO} from "./quizQuestionDTO";
import {debounceTime, distinctUntilChanged, Observable, of} from 'rxjs';
import {FormControl} from "@angular/forms";

type QuizzesState = {
  quizzes: QuizDTO[];
  filters: Filter[];
  status: "loading" | "error" | "done";
}

type Filter = {
  origin: any; // Example: "searchTerm", "checkbox", etc.
  filterCondition: (quiz: QuizDTO) => boolean;
}

export @Injectable({providedIn: 'root'})
class QuizService {
  //===========================================================================
  // properties, fields
  //===========================================================================
  //----------------------------
  // 1.sources
  public quizzesStream = this.readQuizzesInDS(); //todo should come from an apiservice

  public quizSearchControl = new FormControl('');
  public filterStream = this.quizSearchControl.valueChanges;

  //----------------------------
  // 3.status quo
  public quizzesState: WritableSignal<QuizzesState> = signal({quizzes: [], filters: [], status: "loading"});

  //----------------------------
  // 4.deriveds
  public filteredQuizzesCsig = computed(() => {
    this.quizzesState();
    const filters = this.quizzesState().filters;
    const quizzes = this.quizzesState().quizzes;
    return quizzes.filter((quiz) => filters.every((filter) => filter.filterCondition(quiz)))
  })

  public categoriesCsig: Signal<string[]> = computed(() => { // categoriesSig derived from quizzesSig
    return this.filteredQuizzesCsig().map((quiz) => {
      return quiz.category
    }) // get category from each quiz
      .filter((currentCategory, ind, arr) => {
        return arr.indexOf(currentCategory) == ind
      }); // remove duplicates
  });

  //===========================================================================
  // constructors
  //===========================================================================
  constructor() {
    // 2.reducers (sources -> status quo)
    this.quizzesStream.subscribe((quizzes) => {
      this.quizzesState.update((state) => {
        return {...state, quizzes: quizzes, status: "done"}
      });
    });

    this.filterStream.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.quizzesState.update((state) => {
        if (!searchTerm) {
          return {...state, filters: []}
        }

        const currentFilter = {
          origin: this.quizSearchControl,
          filterCondition: (q: QuizDTO) => q.category.includes(searchTerm),
        };

        const existingFilterIndex = state.filters.findIndex(filter => filter.origin === currentFilter.origin);
        const filterExists = existingFilterIndex !== -1

        if (filterExists) {
          state.filters[existingFilterIndex].filterCondition = currentFilter.filterCondition;
        } else {
          state.filters.push({
            origin: this.quizSearchControl,
            filterCondition: currentFilter.filterCondition,
          });
        }
        return {...state}
      });
    });

    // 5.reactions
    effect(() => {
      console.log("allquizzes: ", this.quizzesState().quizzes)
    });
    effect(() => {
      console.log("filteredquizzes: ", this.filteredQuizzesCsig())
    });
    effect(() => {
      console.log("catgegories: ", this.categoriesCsig())
    });
    effect(() => {
      console.log("filter: ", this.quizzesState().filters)
    });
  }

  //===========================================================================
  // methods
  //===========================================================================
  public upsertQuiz(quiz: QuizDTO): void {
    // optimistic approach
    // update UI
    const quizExists: boolean = this.quizzesState().quizzes.includes(quiz);
    if (quizExists) {
      this.quizzesState.update((state) => {
        return {
          ...state, quizzes: state.quizzes.map((q) => {
            return q == quiz ? quiz : q
          })
        } // or splice // todo better replace
      });
    } else if (!quizExists) {
      this.quizzesState.update((state) => {
        state.quizzes.push(quiz);
        return {...state};
      });
    }
    // update data store
    this.upsertQuizInDS(quiz);
  }

  public deleteQuiz(quiz: QuizDTO): void {
    // optimistic approach
    // update UI
    this.quizzesState.update((state) => {
      return {
        ...state,
        quizzes: state.quizzes.filter((q) => {
          return q != quiz
        })
      }; // or splice
    });
    // update data store
    this.deleteQuizInDS(quiz);
  }

  private readQuizzesInDS(): Observable<QuizDTO[]> {
    //fake implementation
    return of([
      new QuizDTO("some category", 0, "test1", [new QuizQuestionDTO("test?", ["test1", "test2", "test3", "test4"], [0, 1])], false, 600),
      new QuizDTO("some category", 1, "test2", [new QuizQuestionDTO("test?", ["test1", "test2", "test3"], [0])], true, 700),
      new QuizDTO("other category", 2, "test3", [new QuizQuestionDTO("test?", ["test1", "test2"], [1])], false, 800),
    ]);
  }

  private upsertQuizInDS(quiz: QuizDTO): void {
    console.log("upsert in ds");
  }

  private deleteQuizInDS(quiz: QuizDTO): void {
    console.log("delete in ds");
  }
}
