

import { Component, ElementRef, HostListener,  ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../quiz.service';
import { QuizDTO } from '../model/QuizDTO';
import { QuizQuestionDTO } from '../model/QuizQuestionDTO';
import { CommonModule } from '@angular/common';
import { Constants } from 'app/app.constants';
import { SortonIndexInParentPipe } from '../../../app.pipes';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { QuizAnimState, scaleAnimation } from 'app/app.animations';
import { DefaultTool, GroupingTool, QuizEditorTool } from './QuizEditorTools';
import { QuizOptionDTO } from '../model/QuizOptionDTO';

@Component({
    selector: 'app-quiz-editor',
    standalone: true,
    templateUrl: './quiz-editor.component.html',
    styleUrl: './quiz-editor.component.css',
    imports: [FormsModule, CommonModule, SortonIndexInParentPipe, DragDropModule],
    animations: [scaleAnimation],
})
export class QuizEditorComponent {
useGroup() {
throw new Error('Method not implemented.');
}
    
    //===========================================================================
    // properties, fields
    //===========================================================================
    box: HTMLElement | undefined;
    Constants = Constants;
    DefaultTool = new DefaultTool();
    GroupingTool = new GroupingTool("");
    
    currentlyEditedQuiz: QuizDTO;
    currentlyEditedQuizQuestion: QuizQuestionDTO | undefined;
    selectedQuizQuestionInd = -1;
    QuizAnimState = QuizAnimState;
    activeTool: QuizEditorTool = new DefaultTool();
    
    @ViewChild('quizTitleInp') quizTitleInp: ElementRef | undefined;
    @ViewChild('timeLimitInp') timeLimitInp: ElementRef | undefined;
    @ViewChild('isOrderedQuizInp') isOrderedQuizInp: ElementRef | undefined;
    // @ViewChild('groupColorInp') groupColorInp: ElementRef | undefined;
    
    //command design pattern
    @HostListener("document:click", ["$event"])
    clickCommand(e: Event) {
        const target = e.target as HTMLElement;
        if (target.classList.contains("question")) {
            const targetQuestion:QuizQuestionDTO = this.currentlyEditedQuiz.quizQuestions[Number(target.id)];
            this.activeTool.clickCommand(targetQuestion);
        }
    }
    
    
    //===========================================================================
    // constructors
    //===========================================================================
    constructor(private route: ActivatedRoute, private router: Router, private quizService: QuizService, ) {
        const title = this.route.snapshot.paramMap.get('id') || undefined;
        const quiz = this.quizService.quizzesCsig().find((q) => q.title === title); //returns a copy
        if (!quiz) this.closeQuizEditor();
        this.currentlyEditedQuiz = quiz!;
    }
    
    //===========================================================================
    // lifecycle hooks
    //===========================================================================
    ngAfterViewInit(): void {
        // this.GroupingTool.groupingColor = this.groupColorInp?.nativeElement.value;
    }
    
    //===========================================================================
    // methods
    //===========================================================================
    activateTool(tool:QuizEditorTool) {
        this.activeTool = tool;
        this.activeTool.activate();
    }
    
    maxScore() {
        return this.currentlyEditedQuiz.quizQuestions.reduce((acc, q) => acc + q.score, 0);
    }
    
    closeQuizEditor(): void {
        this.router.navigate([Constants.MANAGE_QUIZZES_PAGE_ROUTE]);
    }
    
    saveAndCloseQuizEditor(): void {
        if (this.quizTitleInp?.nativeElement.value === "") {
            this.quizTitleInp.nativeElement.value = "cannot be empty";
            return;
        }
        // Todo: check if title already exists
        // Update quiz details
        // Replace the following code with the actual logic to update quiz details
        this.currentlyEditedQuiz.title = this.quizTitleInp?.nativeElement.value;
        this.currentlyEditedQuiz.timeLimit = this.timeLimitInp?.nativeElement.value;
        this.currentlyEditedQuiz.isOrdered = this.isOrderedQuizInp?.nativeElement.checked;

        // Todo: Implement upsertQuizInDB logic
        this.closeQuizEditor();
    }
    
    selectQuizQuestion(quizQuestion: QuizQuestionDTO): void {
        if(this.activeTool instanceof DefaultTool) this.currentlyEditedQuizQuestion = quizQuestion;

    }
    
    addQuizQuestionSkeleton(): void {
        this.currentlyEditedQuiz.quizQuestions.push(new QuizQuestionDTO(Constants.DEFAULT_QUIZ_QUESTION_NAME, [new QuizOptionDTO(genTempID("question-"),Constants.DEFAULT_QUIZ_OPTION_NAME, 0), new QuizOptionDTO(genTempID("question-"),Constants.DEFAULT_QUIZ_OPTION_NAME, 0)], [], false, this.currentlyEditedQuiz.quizQuestions.length, 1, "", false)); //todo {} instead of undefs
    }
    
    addQuizOption(): void {
        this.currentlyEditedQuizQuestion?.options.push(new QuizOptionDTO(genTempID("option-"),Constants.DEFAULT_QUIZ_OPTION_NAME, this.currentlyEditedQuizQuestion.options.length));
    }
    
    updateAnswer(index: number): void {
        throw new Error('Method not implemented.');
    }
    
    updateOptionText($event: FocusEvent) {
    }
    
    updateQuesionText(event: any): void {
    }
    
    removeInputContent(event: FocusEvent, ifContent: string): void {
        const t = event.target as HTMLInputElement;
        if (t.value === ifContent) t.value = "";
    }
    
    dropHandler(event: CdkDragDrop<any[]>) {
        
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        
        const alteredOrderArr: any[] = event.container.data;
        alteredOrderArr.forEach((el, newIndex) => {
            console.log(el);
            el.indexInParent = newIndex;
            // q.setAnimState(QuizAnimState.None); // prevents void=>* animation when quiz is moved to new category
            // this.quizService.quizUpserted$tream.next(q); //todo remove
        });
    }
}

export function genTempID(prefix: string): string {
    // Generate a temporal ID based on the current time
    let temporal_id: string = Date.now().toString();

    // Generate a random number
    let random_number: string = Math.floor(Math.random() * 9000 + 1000).toString();

    // Append the random number to the temporal ID
    let new_id: string = prefix + temporal_id + random_number;

    return new_id;
}
