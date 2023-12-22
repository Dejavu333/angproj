import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-quiz-carousel',
  standalone: true,
  imports: [],
  templateUrl: './quiz-carousel.component.html',
  styleUrl: './quiz-carousel.component.css'
})
export class QuizCarouselComponent {
  deleteQuiz() {
    throw new Error('Method not implemented.');
  }

  openQuizInstanceEditor() {
    throw new Error('Method not implemented.');
  }

  openQuizEditor() {
    throw new Error('Method not implemented.');
  }

  toggleOptions() {
    throw new Error('Method not implemented.');
  }

  isOptionsToggled: any;
  @Input() quizTitle: string = "";

}
