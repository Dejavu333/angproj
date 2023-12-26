import {Injectable, Signal, WritableSignal, computed, effect, signal} from "@angular/core";
import {QuizDTO} from "./model/QuizDTO";
import {debounceTime, distinctUntilChanged, Subject} from 'rxjs';
import {FormControl} from "@angular/forms";
import {CategoryDTO} from "./model/CategoryDTO";
import {ApiService} from "../../api.service";

type ManageQuizzesPageState = {
  quizzes: QuizDTO[];
  categories: CategoryDTO[];
  quizFilters: Filter[];
  categoryFilters: Filter[];
  status: "loading" | "error" | "done";
}

type Filter = {
  origin: any; // obj ref
  filterCondition: (item: any) => boolean;
}

export @Injectable({providedIn: 'root'})
class QuizService {
  //===========================================================================
  // properties, fields
  //===========================================================================
  //----------------------------
  // 1.sources
  public quizzesLoaded$tream = this.apiService.readQuizzesInDS(); //todo should come from an apiservice
  public categoriesLoaded$tream = this.apiService.readCategoriesInDS();

  public quizSearchControl = new FormControl('');
  public quizSearchTerm$tream = this.quizSearchControl.valueChanges;

  public categorySearchControl = new FormControl('');
  public categorySearchTerm$tream = this.categorySearchControl.valueChanges;

  public quizAdded$tream = new Subject<QuizDTO>();
  public quizDeleted$tream = new Subject<string>();

  public categoryAdded$tream = new Subject<CategoryDTO>();
  public categoryDeleted$tream = new Subject<string>();

  //----------------------------
  // 3.status quo
  public quizzesStateSig: WritableSignal<ManageQuizzesPageState> = signal({
    quizzes: [],
    categories: [],
    quizFilters: [],
    categoryFilters: [],
    status: "loading"
  });

  //----------------------------
  // 4.deriveds
  public filteredQuizzesCsig: Signal<QuizDTO[]> = computed(() => {
    const filters = this.quizzesStateSig().quizFilters;
    const quizzes = this.quizzesStateSig().quizzes;
    if (filters.length===0) return quizzes;
    else return quizzes.filter((quiz) => filters.every((filter) => filter.filterCondition(quiz)))
  });

  public filteredCategoriesCsig: Signal<CategoryDTO[]> = computed(() => {
    const cFilters = this.quizzesStateSig().categoryFilters;
    const qFilters = this.quizzesStateSig().quizFilters;
    let categories = this.quizzesStateSig().categories.sort((a,b)=> a.indexOnPage - b.indexOnPage);
    const quizzes = this.quizzesStateSig().quizzes;
    if (qFilters.length>0) {
      const notEmptyCategories = [...new Set(quizzes.map(q => {return q.category}))];
      categories = categories.filter((category) => notEmptyCategories.some((c) => c == category.categoryName));
    }
    if (cFilters.length===0) return categories;
    else return categories.filter((category) => cFilters.every((filter) => filter.filterCondition(category)));
  });

  //===========================================================================
  // constructors
  //===========================================================================
  constructor(private apiService:ApiService) {
    //----------------------------
    // 2.reducers (sources -> status quo)
    this.categoriesLoaded$tream.subscribe((categories) => {
      this.quizzesStateSig.update((state)=>{
        state.categories = categories;
        return {...state};
      });
    });
    this.quizzesLoaded$tream.subscribe((quizzes) => {
      this.quizzesStateSig.update((state) => {
        return {...state, quizzes: quizzes, status: "done"}
      });
    });


    this.quizSearchTerm$tream.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.quizzesStateSig.update((state) => {
        if (!searchTerm) {
          return {...state, quizFilters: []}
        }

        const currentFilter = {
          origin: this.quizSearchControl,
          filterCondition: (q: QuizDTO) => q?.title?.includes(searchTerm),
        };

        const existingFilterIndex = state.quizFilters.findIndex(filter => filter.origin === currentFilter.origin);
        const filterExists = existingFilterIndex !== -1

        if (filterExists) {
          state.quizFilters[existingFilterIndex].filterCondition = currentFilter.filterCondition;
        } else {
          state.quizFilters.push({
            origin: this.quizSearchControl,
            filterCondition: currentFilter.filterCondition,
          });
        }
        return {...state}
      });
    });



    this.quizAdded$tream.subscribe((quizToAdd) => {
      this.quizzesStateSig.update((state) => {

        const existingQuizIndex = state.quizzes.findIndex((q) => q.title === quizToAdd.title);
        const quizExists = existingQuizIndex !== -1;

        if (quizExists) {
          state.quizzes[existingQuizIndex] = quizToAdd;
        } else {
          state.quizzes.push(quizToAdd);
        }

        return {...state};
      });
      this.upsertQuizInDS(quizToAdd);
    });


    this.quizDeleted$tream.subscribe((quizTitle)=> {
      // optimistic approach
      // update UI
      let target: QuizDTO | undefined;
      this.quizzesStateSig.update((state) => {
        const ind = state.quizzes.findIndex(q => q.title == quizTitle);
        target = state.quizzes[ind];
        return {
          ...state,
          quizzes: state.quizzes.filter((q) => {
            return q !== target
          })
        }; // or splice
      });
      // update data store
      target &&
      this.deleteQuizInDS(target);
    });


    this.categoryAdded$tream.subscribe((category) => {
        this.quizzesStateSig.update((state)=>{
          state.categories.push(category);
          return {...state};
        });
      }
    );
    
    //----------------------------
    // 5.reactions
    effect(() => {
      console.log("allquizzes: ", this.quizzesStateSig().quizzes)
    });
    effect(() => {
      console.log("filteredquizzes: ", this.filteredQuizzesCsig())
    });
    effect(() => {
      console.log("catgegories: ", this.filteredCategoriesCsig())
    });
    effect(() => {
      console.log("filter: ", this.quizzesStateSig().quizFilters)
    });
  }

  //===========================================================================
  // methods
  //===========================================================================

}
