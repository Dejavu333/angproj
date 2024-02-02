import { Component, computed, Input, Signal } from '@angular/core';
import { QuizCarouselComponent } from "../quiz-carousel/quiz-carousel.component";
import { QuizDTO } from '../model/QuizDTO';
import { QuizService } from "../quiz.service";
import { fadeAnimation, QuizAnimState, scaleAnimation } from 'app/app.animations';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { genTempID } from '../quiz-editor/quiz-editor.component';

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
    public category: string = "";
    public quizzesInThisCategoryColumnCsig: Signal<QuizDTO[]> = computed(() => {
        return this.quizService.filteredQuizzesCsig()
            .filter(quiz => quiz.category === this.category)
            .sort((a, b) => a.indexInParent - b.indexInParent);
    });

    //===========================================================================
    // constructors
    //===========================================================================
    constructor(private quizService: QuizService) {
    }
        
    //===========================================================================
    // methods
    //===========================================================================
    addEmptyQuizCarouselHandler() {
        this.quizService.quizUpserted$tream.next(new QuizDTO(genTempID("quiz-"), this.category));
    }
    
    dropHandler(event: CdkDragDrop<any[]>, newCategory: string) {
        const droppedElement: QuizDTO = event.item.data;

        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        }
        else {
            droppedElement.category = newCategory;
            transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
        }

        const orderAlteredQuizzes: QuizDTO[] = event.container.data;
        orderAlteredQuizzes.forEach((q, newIndex) => {
            q.indexInParent = newIndex;
            q.setAnimState(QuizAnimState.None); // prevents void=>* animation when quiz is moved to new category
            this.quizService.quizUpserted$tream.next(q);
        });
    }
}