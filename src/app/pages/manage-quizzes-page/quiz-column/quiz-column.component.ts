import { Component } from '@angular/core';
import { QuizCarouselComponent } from "../quiz-carousel/quiz-carousel.component";

@Component({
    selector: 'app-quiz-column',
    standalone: true,
    templateUrl: './quiz-column.component.html',
    styleUrl: './quiz-column.component.css',
    imports: [QuizCarouselComponent]
})
export class QuizColumnComponent {
columnTitle: any;
quizzesOfThisColumn: any;

}
