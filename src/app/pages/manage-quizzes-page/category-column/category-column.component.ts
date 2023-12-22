import { Component, Input } from '@angular/core';
import { QuizCarouselComponent } from "../quiz-carousel/quiz-carousel.component";
import { QuizDTO } from '../quizDTO';

@Component({
    selector: 'app-category-column',
    standalone: true,
    templateUrl: './category-column.component.html',
    styleUrl: './category-column.component.css',
    imports: [QuizCarouselComponent]
})
export class CategoryColumnComponent {
    @Input() category: string = "";
    @Input() quizzesInThisCategoryColumn:QuizDTO[] = [];

  addEmptyQuizCarousel() {
    console.log("adding quizCarousel...")
  }
}

