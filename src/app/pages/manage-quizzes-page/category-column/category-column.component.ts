import {Component, computed, Input, Signal} from '@angular/core';
import {QuizCarouselComponent} from "../quiz-carousel/quiz-carousel.component";
import {QuizDTO} from '../quizDTO';
import {QuizService} from "../quiz.service";

@Component({
  selector: 'app-category-column',
  standalone: true,
  templateUrl: './category-column.component.html',
  styleUrl: './category-column.component.css',
  imports: [QuizCarouselComponent],
})
export class CategoryColumnComponent {

  @Input() category: string = ""; //acts as id
  quizzesInThisCategoryColumnSig: Signal<QuizDTO[]>;

  constructor(private quizService: QuizService) {

    this.quizzesInThisCategoryColumnSig = computed(() => {
      console.log(this.quizService.filteredQuizzesCsig()); //todo remove
      return this.quizService.filteredQuizzesCsig().filter(quiz => quiz.category == this.category)
                                          .sort((a, b) => a.indexInColumn - b.indexInColumn);
    });
  }

  addEmptyQuizCarousel() {
    console.log("adding quizCarousel...")
  }
}

