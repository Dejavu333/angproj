import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CategoryColumnComponent } from "./category-column/category-column.component";
import { QuizEditorComponent } from "./quiz-editor/quiz-editor.component";
import { QuizInstanceEditorComponent } from "./quiz-instance-editor/quiz-instance-editor.component";
import { QuizService } from './quiz.service';
import { RouterOutlet } from "@angular/router";
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from "@angular/forms";
import { CategoryDTO } from "./model/CategoryDTO";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { fadeAnimation, scaleAnimation } from 'app/app.animations';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-manage-quizzes-page',
    standalone: true,
    templateUrl: './manage-quizzes-page.component.html',
    styleUrl: './manage-quizzes-page.component.css',
    imports: [CategoryColumnComponent, QuizEditorComponent, QuizInstanceEditorComponent, RouterOutlet, ReactiveFormsModule, DragDropModule, CommonModule],
    animations: [scaleAnimation,fadeAnimation],
})
export class ManageQuizzesPageComponent implements OnInit {
    //===========================================================================
    // properties, fields
    //===========================================================================
    @ViewChild('cinp')
    cinp!: ElementRef<HTMLInputElement>;
    
    readonly errorMessages = {
        emptyError: "cannot be empty",
        duplicateError: "already exists"
    }

    newCategoryFormGroup: FormGroup<any>;

    //===========================================================================
    // constructors
    //===========================================================================
    constructor(public quizService: QuizService, private formBuilder: FormBuilder) {
        this.newCategoryFormGroup = this.formBuilder.group({
            newCategoryFormControl: ['', [Validators.required, containsUppercaseValidator()]]
        });
    }

    //===========================================================================
    // lifecycle hooks
    //===========================================================================
    ngOnInit(): void {
    }

    //===========================================================================
    // methods
    //===========================================================================
    public addCategory(categoryName: string): void {
        console.log("adding categoryColumn...")
        if (!this.newCategoryFormGroup.valid) return;
        const newCategory = this.newCategoryFormGroup.get('newCategoryFormControl')?.value; 
        const category = new CategoryDTO(newCategory); 
        this.quizService.categoryAdded$tream.next(category);
        this.purgeInput(this.cinp);
    }

    
    purgeInput(inp:ElementRef) {
        inp.nativeElement.value = '';
    }

    getErrorMessage(errorName: string): string {
        switch (errorName) {
            case 'required':
                return 'This field is required.';
            case 'containsUppercase':
                return 'The category must contain at least one uppercase letter.';
            // Add more error cases as needed...
            default:
                return '';
        }
    }
}

function containsUppercaseValidator(): ValidatorFn {
    return function (control: AbstractControl): { [key: string]: any } | null {
        const containsUppercase = /[A-Z]/.test(control.value);
        return containsUppercase ? null : { containsUppercase: true };
    };
}