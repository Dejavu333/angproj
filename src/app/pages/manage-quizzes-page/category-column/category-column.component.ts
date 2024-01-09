import { Component, computed, Input, Signal } from '@angular/core';
import { QuizCarouselComponent } from "../quiz-carousel/quiz-carousel.component";
import { QuizDTO } from '../model/QuizDTO';
import { QuizService } from "../quiz.service";
import { fadeAnimation, scaleAnimation } from 'app/app.animations';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-category-column',
    standalone: true,
    templateUrl: './category-column.component.html',
    styleUrl: './category-column.component.css',
    imports: [QuizCarouselComponent, DragDropModule],
    animations: [fadeAnimation, scaleAnimation],
})
export class CategoryColumnComponent {
    //===========================================================================
    // properties, fields
    //===========================================================================
    @Input()
    public category: string = ""; //acts as id
    public quizzesInThisCategoryColumnCsig: Signal<QuizDTO[]> = computed(() => {
        console.log(this.category,this.quizService.filteredQuizzesCsig());
        return this.quizService.filteredQuizzesCsig()
            .filter(quiz => quiz.category === this.category)
            .sort((a, b) => a.indexInColumn - b.indexInColumn);
    });
asd: any = "x";
    // public areAnimsDisabled:boolean = false; //to be removed

    //===========================================================================
    // constructors
    //===========================================================================
    constructor(private quizService: QuizService) {
        // this.animsDisabledSubs();
    }
        
    //===========================================================================
    // methods
    //===========================================================================
    // private animsDisabledSubs() {
    //     this.quizService.quizCarouselAnimsDisabled$tream.subscribe((category) => {
    //         if (category === this.category) {
    //             this.areAnimsDisabled = true;
    //             setTimeout(() => {
    //                 this.areAnimsDisabled = false;
    //             }, 0);
    //         }
    //     });
    // }

    addEmptyQuizCarouselHandler() {
        this.quizService.quizUpserted$tream.next(new QuizDTO(this.category));
    }
    
    // tempDisableQuizCarouselAnimsInCategory(category:string) {
    //     this.quizService.quizCarouselAnimsDisabled$tream.next(category);
    // }

    dropHandler(event: CdkDragDrop<any[]>, newCategory: string) {

        const droppedElement: QuizDTO = event.item.data;

        // const prevCategory:string = droppedElement.category;
        // this.tempDisableQuizCarouselAnimsInCategory(prevCategory);

        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        }
        else {
            droppedElement.category = newCategory;
            transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
        }

        const orderAlteredQuizzes: QuizDTO[] = event.container.data;
        orderAlteredQuizzes.forEach((q, newIndex) => {
            q.indexInColumn = newIndex;
            this.quizService.quizUpserted$tream.next(q);
        });
    }
}