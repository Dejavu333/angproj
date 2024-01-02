import { Component, computed, Input, Signal } from '@angular/core';
import { QuizCarouselComponent } from "../quiz-carousel/quiz-carousel.component";
import { QuizDTO } from '../model/QuizDTO';
import { QuizService } from "../quiz.service";
import { fadeAnimation, scaleAnimation } from 'app/app.animations';
import { moveItemInArray, transferArrayItem, DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';


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
  quizzesInThisCategoryColumnCsig: Signal<QuizDTO[]>;

  constructor(private quizService: QuizService) {

    this.quizzesInThisCategoryColumnCsig = computed(() => {
      return this.quizService.filteredQuizzesCsig()
        .filter(quiz => quiz.category === this.category)
        .sort((a, b) => a.indexInColumn - b.indexInColumn);
    });
  }

  addEmptyQuizCarouselHandler() {
    console.log("adding empty quizCarousel...")
    this.quizService.quizAdded$tream.next(new QuizDTO(this.category));
  }

  dropHandler(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
        const droppedElement = event.item.data
        console.log(droppedElement)
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}

