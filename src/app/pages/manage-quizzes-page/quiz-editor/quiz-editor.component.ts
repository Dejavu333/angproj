import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-quiz-editor',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './quiz-editor.component.html',
    styleUrl: './quiz-editor.component.css'
})
export class QuizEditorComponent implements OnInit {
updateOptionText($event: FocusEvent,_t41: any) {
throw new Error('Method not implemented.');
}
    currentlyEditedQuizTitle: string | undefined;
    quiz: any; // Replace 'any' with the actual type of the quiz object
    questions: any[] = []; // Replace 'any' with the actual type of the questions array
    selectedQuizQuestionInd = -1;

    @ViewChild('quizTitleInp') quizTitleInp: ElementRef | undefined;
    @ViewChild('timeLimitInp') timeLimitInp: ElementRef | undefined
    @ViewChild('isOrderedQuizInp') isOrderedQuizInp: ElementRef | undefined

    constructor() { }

    ngOnInit(): void {
        this.configurateDragulForQuizQuestions();
        this.quizTitleInp?.nativeElement.addEventListener("focus", () => {
            if (this.quizTitleInp?.nativeElement.value === "cannot be empty") {
                this.quizTitleInp.nativeElement.value = "";
            }
        });
    }

    trimmedQuestionName(questionName: string): string {
        if (questionName?.length > 16) {
            return questionName.substring(0, 16) + "...";
        }
        return questionName;
    }

    configurateDragulForQuizQuestions(): void {
        // Implement dragula configuration
    }

    closeQuizEditor(): void {
        // Implement closeQuizEditor functionality
    }

    saveAndCloseQuizEditor(): void {
        if (this.quizTitleInp?.nativeElement.value === "") {
            this.quizTitleInp.nativeElement.value = "cannot be empty";
            return;
        }
        // Todo: check if title already exists

        // Update quiz details
        // Replace the following code with the actual logic to update quiz details
        this.quiz.title = this.quizTitleInp?.nativeElement.value;
        this.quiz.timeLimit = this.timeLimitInp?.nativeElement.value;
        this.quiz.isOrdered = this.isOrderedQuizInp?.nativeElement.checked;
        this.quiz.quizQuestions = this.questions;

        // Todo: Implement upsertQuizInDB logic

        this.closeQuizEditor();
    }

    selectQuizQuestion(index: number): void {
        // Implement selectQuizQuestion functionality
    }

    addQuizQuestionSkeleton(): void {
        this.questions = [...this.questions, {}]; // Replace {} with the actual structure of QuizQuestionDTO
    }

    addOption(index: number): void {
        // Implement addOption functionality
    }

    updateAnswer(index: number): void {
        // Implement updateAnswer functionality
    }

    updateQuesionText(event: any): void {
        // Implement updateQuesionText functionality
    }

    removeInputContent(event: any, ifContent: string): void {
        // Implement removeInputContent functionality
    }
}