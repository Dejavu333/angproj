import { Component,  HostListener,  Input, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { flyInOutAnimation, scaleAnimation } from 'app/app.animations';

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

    public scale = { value: 'asd', params: { startScale: '0', endScale: '1.25', animationDuration: '150ms' } };

    public isQuizToolbarShowing: boolean = false;
    
    //===========================================================================
    // constructors
    //===========================================================================
    constructor() {
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
        this.scale = {...this.scale,value:"fadeout"}
        // this.scale = {...this.scale,value:"scaleout"}
        console.log("deleting quiz...")
        setTimeout(()=>this.isQuizToolbarShowing = false)

        // this.quizService.quizDeleted$tream.next(this.quizTitle)
    }

    public showQuizToolbarHandler = (): void => {
        this.isQuizToolbarShowing = true;
    }

    @HostListener("document:click", ["$event"])
    public hideQuizToolbarHandler(e: Event): void {
        // this.isQuizToolbarShowing = false;
    }
}
