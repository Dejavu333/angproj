import {Component, computed, Input, Signal} from '@angular/core';
import {QuizCarouselComponent} from "../quiz-carousel/quiz-carousel.component";
import {QuizDTO} from '../model/QuizDTO';
import {QuizService} from "../quiz.service";

@Component({
  selector: 'app-category-column',
  standalone: true,
  templateUrl: './category-column.component.html',
  styleUrl: './category-column.component.css',
  imports: [QuizCarouselComponent],
})
export class CategoryColumnComponent {

  @Input()
  category: string = ""; //acts as id
  quizzesInThisCategoryColumnSig: Signal<QuizDTO[]>;

  constructor(private quizService: QuizService) {

    this.quizzesInThisCategoryColumnSig = computed(() => {
      return this.quizService.filteredQuizzesCsig()
        .filter(quiz => quiz.category == this.category)
        .sort((a, b) => a.indexInColumn - b.indexInColumn);
    });
  }

  addEmptyQuizCarousel() {
    console.log("adding empty quizCarousel...")
    this.quizService.quizAdded$tream.next(new QuizDTO(this.category));
  }
}

