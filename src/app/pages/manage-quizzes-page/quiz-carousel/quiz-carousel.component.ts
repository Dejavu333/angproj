import {Component, Input, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {fadeAnimation} from 'app/app.animations';
import {onEvent} from "../../../../main";

@Component({
  selector: 'app-quiz-carousel',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './quiz-carousel.component.html',
  styleUrl: './quiz-carousel.component.css',
  animations: [fadeAnimation],
})
export class QuizCarouselComponent implements OnInit {
  @Input()
  public quizTitle: string = "";
  public isQuizToolbarShowing:boolean = false;

  constructor() {
  }

  ngOnInit() {
    onEvent("click",this.hideQuizToolbar);  //method must be lambda to bring its context
  }

  public deleteQuiz() {
    console.log("deleting quiz...")
  }

  public showQuizToolbar = ():void=>{
    this.isQuizToolbarShowing=true;
  }

  public hideQuizToolbar = (e:Event):void=>{
    this.isQuizToolbarShowing=false;
  }
}
