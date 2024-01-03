import { Component, HostListener, Input, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { fadeAnimation, scaleAnimation } from 'app/app.animations';
import { QuizService } from "../quiz.service";

@Component({
    selector: 'app-quiz-carousel',
    standalone: true,
    imports: [
        RouterLink,
    ],
    templateUrl: './quiz-carousel.component.html',
    styleUrl: './quiz-carousel.component.css',
    animations: [fadeAnimation, scaleAnimation],
})
export class QuizCarouselComponent implements OnInit {
    //===========================================================================
    // properties, fields
    //===========================================================================
    @Input()
    public quizTitle: string = "";
    
    public isQuizToolbarShowing: boolean = false;
    
    //===========================================================================
    // constructors
    //===========================================================================
    constructor(private quizService: QuizService) {
    }

    //===========================================================================
    // lifecycle hooks
    //===========================================================================
    ngOnInit() {
    }

    //===========================================================================
    // methods
    //===========================================================================
    public deleteQuiz() {
        console.log("deleting quiz...")
        this.quizService.quizDeleted$tream.next(this.quizTitle);
    }

    public showQuizToolbar = (): void => {
        this.isQuizToolbarShowing = true;
    }

    @HostListener("document:click", ["$event"])
    public hideQuizToolbar(e: Event): void {
        this.isQuizToolbarShowing = false;
    }
}
