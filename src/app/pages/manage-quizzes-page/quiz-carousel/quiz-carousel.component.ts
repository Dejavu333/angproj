import { Component, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { flyInOutAnimation, scaleAnimation } from 'app/app.animations';
import { QuizService } from "../quiz.service";
import { doWaitDo } from 'main';

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

    @HostBinding('@scale') 
    public scale = { value: "x", params: { startScale: '0', endScale: '1.25', animationDuration: 1200 } };

    
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
    public deleteQuizHandler() {
        doWaitDo(
            () => this.scale = { ...this.scale, value: "y" },
            this.scale.params.animationDuration,
            () => this.quizService.quizDeleted$tream.next(this.quizTitle)
        );
    }

    public showQuizToolbarHandler = (): void => {
        this.isQuizToolbarShowing = true;
    }

    @HostListener("document:click", ["$event"])
    public hideQuizToolbarHandler(e: Event): void {
        this.isQuizToolbarShowing = false;
    }

}
