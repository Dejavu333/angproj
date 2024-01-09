import { Component,  HostListener,  Input, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { flyInOutAnimation, scaleAnimation } from 'app/app.animations';
import { QuizService } from '../quiz.service';

@Component({
    selector: 'app-quiz-carousel',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './quiz-carousel.component.html',
    styleUrl: './quiz-carousel.component.css',
    animations: [flyInOutAnimation, scaleAnimation],
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
    constructor(private quizService:QuizService) {
    }

    //===========================================================================
    // lifecycle hooks
    //===========================================================================
    ngOnInit() {
    }

    //===========================================================================
    // methods
    //===========================================================================
    public deleteQuizHandler() {
        console.log("deleting quiz...")
        this.quizService.quizaAnimChanged$tream.next({quizTitle:this.quizTitle,animState:"scale-out"});
        setTimeout(()=>this.quizService.quizDeleted$tream.next(this.quizTitle),2000)
    }

    public showQuizToolbarHandler = (): void => {
        this.isQuizToolbarShowing = true;
    }

    @HostListener("document:click", ["$event"])
    public hideQuizToolbarHandler(e: Event): void {
        this.isQuizToolbarShowing = false;
    }
}
