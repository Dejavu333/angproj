import { Component, computed, Input, Signal } from '@angular/core';
import { QuizCarouselComponent } from "../quiz-carousel/quiz-carousel.component";
import { QuizDTO } from '../model/QuizDTO';
import { QuizService } from "../quiz.service";
import { fadeAnimation, scaleAnimation } from 'app/app.animations';

@Component({
  selector: 'app-category-column',
  standalone: true,
  templateUrl: './category-column.component.html',
  styleUrl: './category-column.component.css',
  imports: [QuizCarouselComponent],
  animations: [fadeAnimation, scaleAnimation],
})
export class CategoryColumnComponent {

  @Input()
  category: string = ""; //acts as id
  quizzesInThisCategoryColumnCsig: Signal<QuizDTO[]>;

  constructor(private quizService: QuizService) {

    this.quizzesInThisCategoryColumnCsig = computed(() => {
      const d = this.quizService.filteredQuizzesCsig()
        .filter(quiz => quiz.category === this.category)
        .sort((a, b) => a.indexInColumn - b.indexInColumn);
      console.log("quizzesinthiscategory", d); //todo remove
      return d;
    });
  }

  addEmptyQuizCarouselHandler() {
    console.log("adding empty quizCarousel...")
    this.quizService.quizAdded$tream.next(new QuizDTO(this.category));
  }
}

