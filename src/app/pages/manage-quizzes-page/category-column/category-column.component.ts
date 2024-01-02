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

    @Input()
    category: string = ""; //acts as id
    quizzesInThisCategoryColumnCsig: Signal<QuizDTO[]> = computed(() => {
        const s =this.quizService.filteredQuizzesCsig()
            .filter(quiz => quiz.category === this.category)
            .sort((a, b) => a.indexInColumn - b.indexInColumn);
        console.log("quizzesinthiscategorecomputed: ",this.category,s)
            return s;
    });

    constructor(private quizService: QuizService) {

    }

    addEmptyQuizCarouselHandler() {
        console.log("adding empty quizCarousel...")
        this.quizService.quizUpserted$tream.next(new QuizDTO(this.category));
    }

    dropHandler(event: CdkDragDrop<any[]>, newCategory: string) {
        const droppedElement: QuizDTO = event.item.data;
        
        if (event.previousContainer === event.container) {
            console.log("same column")
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
            const alteredQuizzes:QuizDTO[] = event.container.data;
            console.log("container data before next",event.container.data);
            alteredQuizzes.forEach((q,newIndex) => {
                q.indexInColumn = newIndex;     
                this.quizService.quizUpserted$tream.next(q);
            });    
        }
        else {
            console.log("different column")
            droppedElement.indexInColumn = event.currentIndex;
            droppedElement.category = newCategory;
            transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
            const alteredQuizzes:QuizDTO[] = event.container.data;
            alteredQuizzes.forEach((q,newIndex) => {
                q.indexInColumn = newIndex;     
                this.quizService.quizUpserted$tream.next(q);
            });   
        }
        console.log("container data",event.container.data);
    }
}
