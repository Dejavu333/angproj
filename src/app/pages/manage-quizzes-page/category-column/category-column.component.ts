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
        return this.quizService.filteredQuizzesCsig()
            .filter(quiz => quiz.category === this.category)
            .sort((a, b) => a.indexInColumn - b.indexInColumn);
    });
    public areAnimsDisabled = false;
    // scaleAnimState = ''; // void

    //===========================================================================
    // constructors
    //===========================================================================
    constructor(private quizService: QuizService) {
        this.animsDisabledSub();
    }
        
    //===========================================================================
    // methods
    //===========================================================================
    private animsDisabledSub() {
        this.quizService.quizCarouselAnimsDisabled$tream.subscribe((category) => {
            if (category === this.category) {
                this.areAnimsDisabled = true;
                setTimeout(() => {
                    this.areAnimsDisabled = false;
                }, 0);
            }
        });
    }

    addEmptyQuizCarouselHandler() {
        // this.enableLifecycleAnimation();
        this.quizService.quizUpserted$tream.next(new QuizDTO(this.category));
        // this.disableLifecycleAnimation();
        // this.scaleAnimState = 'removeQuiz';
    }
    
    tempDisableQuizCarouselAnimsInCategory(category:string) {
        this.quizService.quizCarouselAnimsDisabled$tream.next(category);
    }

    dropHandler(event: CdkDragDrop<any[]>, newCategory: string) {

        const droppedElement: QuizDTO = event.item.data;

        //prevents unwanted animations when carousel leaves the current column
        // this.disableLifecycleAnimation();
        const prevCategory:string = droppedElement.category;
        this.tempDisableQuizCarouselAnimsInCategory(prevCategory);

        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
            const alteredQuizzes: QuizDTO[] = event.container.data;
            alteredQuizzes.forEach((q, newIndex) => {
                q.indexInColumn = newIndex;
                this.quizService.quizUpserted$tream.next(q);
            });
        }
        else {
            droppedElement.indexInColumn = event.currentIndex;
            droppedElement.category = newCategory;
            transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
            const alteredQuizzes: QuizDTO[] = event.container.data;
            alteredQuizzes.forEach((q, newIndex) => {
                q.indexInColumn = newIndex;
                this.quizService.quizUpserted$tream.next(q);
            });
        }

    }

    // enableLifecycleAnimation() {
    //     this.isQuizCarouselLifecycleAnimationDisabled = false;
    // }

    // disableLifecycleAnimation() {

    //         this.isQuizCarouselLifecycleAnimationDisabled = true;

    //     setTimeout(() => {
    //         this.enableLifecycleAnimation();
    //     }), 250;
    // }

    // disableUnwantedAnimations() {

    // }
}