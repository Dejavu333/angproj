import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../quiz.service';
import { QuizDTO } from '../model/QuizDTO';
import { QuizOptionDTO, QuizQuestionDTO } from '../model/QuizQuestionDTO';
import { CommonModule } from '@angular/common';
import { Constants } from 'app/app.constants';
import { SortonIndexInParentPipe } from '../../../app.pipes';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { QuizAnimState, scaleAnimation } from 'app/app.animations';
import { DefaultTool, GroupingTool, QuizEditorTool } from './QuizEditorTools';

@Component({
    selector: 'app-quiz-editor',
    standalone: true,
    templateUrl: './quiz-editor.component.html',
    styleUrl: './quiz-editor.component.css',
    imports: [FormsModule, CommonModule, SortonIndexInParentPipe, DragDropModule],
    animations: [scaleAnimation],
})
export class QuizEditorComponent {
    
    //===========================================================================
    // properties, fields
    //===========================================================================
    box: HTMLElement | undefined;
    Constants = Constants;
    DefaultTool = new DefaultTool();
    GroupingTool = new GroupingTool();
    
    currentlyEditedQuiz: QuizDTO;
    currentlyEditedQuizQuestion: QuizQuestionDTO | undefined;
    selectedQuizQuestionInd = -1;
    QuizAnimState = QuizAnimState;
    
    @ViewChild('fasz') container: ElementRef | undefined;
    @ViewChild('quizTitleInp') quizTitleInp: ElementRef | undefined;
    @ViewChild('timeLimitInp') timeLimitInp: ElementRef | undefined;
    @ViewChild('isOrderedQuizInp') isOrderedQuizInp: ElementRef | undefined;
    startX: any;
    startY: any;
    activeTool: QuizEditorTool = new DefaultTool();
    
    //command design pattern
    @HostListener("document:click", ["$event"])
    clickCommand(e: Event) {
        const target = e.target as HTMLElement;
        // console.log(target) //todo remove
        if (target.classList.contains("question")) this.activeTool.clickCommand();
    }
    
    
    //===========================================================================
    // constructors
    //===========================================================================
    constructor(private route: ActivatedRoute, private router: Router, private quizService: QuizService, private renderer: Renderer2) {
        const title = this.route.snapshot.paramMap.get('id') || undefined;
        const quiz = this.quizService.quizzesCsig().find((q) => q.title === title); //returns a copy
        if (!quiz) this.closeQuizEditor();
        this.currentlyEditedQuiz = quiz!;
    }
    
    //===========================================================================
    // lifecycle hooks
    //===========================================================================
    ngAfterViewInit(): void {
        setTimeout(() => {
            console.log("selectionZone", this.container?.nativeElement);
        }, 1000);
        
        this.renderer.listen('document', 'mousedown', (e) => {
            let rect = this.container?.nativeElement.getBoundingClientRect();
            if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
                this.startX = e.clientX - rect.left;
                this.startY = e.clientY - rect.top;
                this.box = this.renderer.createElement('div');
                this.renderer.setStyle(this.box, 'border', '1px solid black');
                this.renderer.setStyle(this.box, 'position', 'absolute');
                this.renderer.appendChild(this.container?.nativeElement, this.box);
            }
        });
        
        this.renderer.listen('document', 'mousemove', (e) => {
            if (!this.box) return;
            let rect = this.container?.nativeElement.getBoundingClientRect();
            if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
                let x = Math.min(e.clientX - rect.left, this.startX);
                let y = Math.min(e.clientY - rect.top, this.startY);
                let width = Math.abs(e.clientX - rect.left - this.startX);
                let height = Math.abs(e.clientY - rect.top - this.startY);
                this.renderer.setStyle(this.box, 'left', `${x}px`);
                this.renderer.setStyle(this.box, 'top', `${y}px`);
                this.renderer.setStyle(this.box, 'width', `${width}px`);
                this.renderer.setStyle(this.box, 'height', `${height}px`);
            }
        });
        
        this.renderer.listen('document', 'mouseup', () => {
            if (!this.box) return;
            let { left, top, width, height } = this.box.getBoundingClientRect();
            let elements = this.container?.nativeElement.querySelectorAll('div.question');
            elements.forEach((el: { getBoundingClientRect: () => { left: any; top: any; width: any; height: any; }; }) => {
                let { left: elLeft, top: elTop, width: elWidth, height: elHeight } = el.getBoundingClientRect();
                if (elLeft > left && elTop > top && elLeft + elWidth < left + width && elTop + elHeight < top + height) {
                    this.renderer.setStyle(el, 'background', 'yellow');
                }
            });
            this.renderer.removeChild(this.container?.nativeElement, this.box);
            this.box = undefined;
        });
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
    
    selectQuizQuestion(index: number): void {
        this.currentlyEditedQuizQuestion = this.currentlyEditedQuiz.quizQuestions[index];
    }
    
    addQuizQuestionSkeleton(): void {
        this.currentlyEditedQuiz.quizQuestions.push(new QuizQuestionDTO(Constants.DEFAULT_QUIZ_QUESTION_NAME, [new QuizOptionDTO(Constants.DEFAULT_QUIZ_OPTION_NAME, 0), new QuizOptionDTO(Constants.DEFAULT_QUIZ_OPTION_NAME, 0)], [], false, this.currentlyEditedQuiz.quizQuestions.length, 1)); //todo {} instead of undefs
    }
    
    addOption(): void {
        this.currentlyEditedQuizQuestion?.options.push(new QuizOptionDTO(Constants.DEFAULT_QUIZ_OPTION_NAME, this.currentlyEditedQuizQuestion.options.length));
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
