// import { CategoryColumnComponent } from "../category-column/category-column.component";

import { getActiveConsumer } from "@angular/core/primitives/signals";

// export enum Filters {
//     ALL = "all",
//     ACTIVE = "active",
//     INACTIVE = "inactive",
//     SEARCH
// }

// type Filter = {
//     status : "all"|"active"|"inactive";
//     searchTerm: string;
//     laterThan: Date;
// }

//categories
//quizzes

//filteredQuizzes
//filteredCategories

enum FilterKind {
    PARITYFILTER = "parityFilter",
    SEARCHTERMFILTER = "searchTermFilter",
    ORDERFILTER = "orderFilter",
    LIMITFILTER = "limitFilter",
  }

class Filter {
    public prerequisites: Filter[] = [];
    public kind: FilterKind;
    public predicate: (...args: any[]) => boolean;

    constructor(kind: FilterKind, predicate: (...args: any[]) => boolean, prerequisites?:Filter[]) {
        this.kind = kind;
        this.predicate = predicate;
    }

    applyTo(items: any[]): any[] {
        return items.filter(item => this.predicate(item));
    }
}

//maps for check kind
acc
org 

categories


quizzes 
    lang
    organisation 

type Quiz={
    id:string;
}

type Category ={
    id:string;
    name:string;
}

type DepartmentInCharge ={
    id:string;
    name:string;
}

type CategoryˇQuiz ={
    categoryId:string;
    quizId:string;
}

type DepartmentInChargeˇQuiz ={
    departmentInChargeId:string;
    quizId:string;
}


