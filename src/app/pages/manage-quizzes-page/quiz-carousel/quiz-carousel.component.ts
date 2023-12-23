import {Component, HostListener, Input, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {fadeAnimation} from 'app/app.animations';

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
  }

  public deleteQuiz() {
    console.log("deleting quiz...")
  }

  public showQuizToolbar = ():void=>{
    this.isQuizToolbarShowing=true;
  }

  // public hideQuizToolbar = (e:Event):void=>{
  //   this.isQuizToolbarShowing=false;
  // }

  @HostListener("document:click", ["$event"])
  public hideQuizToolbar(e:Event):void {
    console.log(e);
    this.isQuizToolbarShowing=false;
  }
}
