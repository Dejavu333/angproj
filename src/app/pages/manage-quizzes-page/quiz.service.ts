import { Injectable, Signal, WritableSignal, computed, signal } from "@angular/core";
import { QuizDTO } from "./model/QuizDTO";
import { Filter, FilterKind } from "./model/Filter";
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { FormControl } from "@angular/forms";
import { CategoryDTO } from "./model/CategoryDTO";
import { ApiService } from "../../api.service";
import { QuizzesState } from "./model/QuizzesState";

export @Injectable({ providedIn: 'root' })
class QuizService {
    //===========================================================================
    // properties, fields
    //===========================================================================
    //----------------------------
    // 1.sources
    public quizzesLoaded$tream = this.apiService.readQuizzesInDS();
    public categoriesLoaded$tream = this.apiService.readCategoriesInDS();

    public quizSearchControl = new FormControl('');
    public quizSearchTerm$tream = this.quizSearchControl.valueChanges;

    public categorySearchControl = new FormControl('');
    public categorySearchTerm$tream = this.categorySearchControl.valueChanges;

    public quizUpserted$tream = new Subject<QuizDTO>();
    public quizDeleted$tream = new Subject<string>();

    public categoryAdded$tream = new Subject<CategoryDTO>();
    public categoryDeleted$tream = new Subject<string>();

    public quizaAnimChanged$tream = new Subject<{ quizTitle: string, animState: any }>();

    //----------------------------
    // 3.sates
    public quizzesStateSig: WritableSignal<QuizzesState> = signal({
        quizzes: [],
        categories: [],
        filters: new Map<string, Filter>(),
        status: "loading",
    });

    //----------------------------
    // 4.deriveds
    private categoriesCsig: Signal<CategoryDTO[]> = computed(() => {
        return [...this.quizzesStateSig().categories];// csig must return a copy so further computed signals (csigs) can be derived from it
    });

    private sortedCategoriesCsig: Signal<CategoryDTO[]> = computed(() => {
        return [...this.categoriesCsig().sort((a, b) => { return a.indexOnPage - b.indexOnPage })];
    });

    public quizzesCsig: Signal<QuizDTO[]> = computed(() => {
        return [...this.quizzesStateSig().quizzes];
    });

    private filtersCsig: Signal<Map<string, Filter>> = computed(() => {
        return new Map(this.quizzesStateSig().filters);
    });

    public filteredQuizzesCsig: Signal<QuizDTO[]> = computed(() => {
        if (this.filtersCsig().size === 0) return this.quizzesCsig();
        else return Array.from(this.filtersCsig().values())
            .reduce((reducedFilteredQuizzes, filter) => {
                return filter.applyTo(reducedFilteredQuizzes);
            }, this.quizzesCsig());
    });

    public filteredCategoriesCsig: Signal<CategoryDTO[]> = computed(() => {
        if (this.filtersCsig().size === 0) return this.sortedCategoriesCsig();
        else return Array.from(this.filtersCsig().values())
            .reduce((reducedFilteredCategories, filter) => {
                return filter.applyTo(reducedFilteredCategories);
            }, this.sortedCategoriesCsig());
    });

    //===========================================================================
    // constructors
    //===========================================================================
    constructor(private apiService: ApiService) {
        //----------------------------
        // 2.reducers (sources -> state)
        this.categoriesLoadedSubs();

        this.quizzesLoadedSubs();

        this.quizSearchTermSubs();

        this.quizUpsertedSubs();

        this.quizDeletedSubs();

        this.categoryAddedSubs();

        this.quizAnimChangedSubs();

        //----------------------------
        // 5.reactions
        // effect(() => {
        //     console.log("allquizzes: ", this.quizzesStateSig().quizzes)
        // });
        // effect(() => {
        //     console.log("filteredquizzes: ", this.filteredQuizzesCsig())
        // });
        // effect(() => {
        //     console.log("filteredcatgegories: ", this.filteredCategoriesCsig())
        // });
        // effect(() => {
        //     console.log("filter: ", this.quizzesStateSig().filters)
        // });
    }


    //===========================================================================
    // methods
    //===========================================================================
    private quizAnimChangedSubs() {
        this.quizaAnimChanged$tream.subscribe((inp) => {
            this.quizzesStateSig.update((state) => {
                const newState = { ...state };
                newState.quizzes.find((q) => {
                    return q.title === inp.quizTitle;
                })?.setAnimState(inp.animState);
                return { ...newState };
            });
        });
    }

    private categoryAddedSubs() {
        this.categoryAdded$tream.subscribe((categoryToAdd) => {
            this.quizzesStateSig.update((state) => {
                const updatedCategories = [...state.categories, categoryToAdd];
                return { ...state, categories: updatedCategories };
            });
        });
    }

    private quizDeletedSubs() {
        this.quizDeleted$tream.subscribe((quizTitle) => {
            // optimistic approach
            // update UI
            let target: QuizDTO | undefined;
            this.quizzesStateSig.update((state) => {
                const ind = state.quizzes.findIndex(q => q.title == quizTitle);
                target = state.quizzes[ind];

                const arrWithoutDeletedQuiz = state.quizzes.filter((q) => {
                    return q !== target;
                });

                return { ...state, quizzes: arrWithoutDeletedQuiz };
            });
            // update data store
            target &&
                this.apiService.deleteQuizInDS(target);
        });
    }

    private quizUpsertedSubs() {
        this.quizUpserted$tream.subscribe((quizToAdd) => {
            // optimistic approach
            // update UI    //todo use id instead of title for finding what to upsert
            const qInd: number = this.quizzesCsig().findIndex((q) => q.title === quizToAdd.title);
            const quizExists: boolean = (qInd !== -1);
            this.quizzesStateSig.update((state) => {
                if (quizExists) {
                    const newState = { ...state };
                    newState.quizzes[qInd] = quizToAdd;
                    return { ...newState };
                }
                else {
                    const updatedQuizzes = [...state.quizzes, quizToAdd];
                    return { ...state, quizzes: updatedQuizzes };
                }
            });
            // update data store
            this.apiService.upsertQuizInDS(quizToAdd);
        });
    }

    private quizSearchTermSubs() {
        this.quizSearchTerm$tream.pipe(debounceTime(300), distinctUntilChanged()).subscribe(searchTerm => {
            this.quizzesStateSig.update((state) => {
                const newState = { ...state };

                if (!searchTerm) {
                    newState.filters.delete(FilterKind.SEARCHTERMFILTER);
                    return { ...state };
                }

                const predicate = (q: any) => q?.title?.includes(searchTerm.toLocaleLowerCase());
                const newFilter = new Filter(FilterKind.SEARCHTERMFILTER, predicate);
                newState.filters.set(newFilter.kind, newFilter);

                return { ...newState };
            });
        });
    }

    private quizzesLoadedSubs() {
        this.quizzesLoaded$tream.subscribe((quizzes) => {
            this.quizzesStateSig.update((state) => {
                return { ...state, quizzes: quizzes, status: "done" };
            });
        });
    }

    private categoriesLoadedSubs() {
        this.categoriesLoaded$tream.subscribe((categories) => {
            this.quizzesStateSig.update((state) => {
                return { ...state, categories: categories };
            });
        });
    }
}