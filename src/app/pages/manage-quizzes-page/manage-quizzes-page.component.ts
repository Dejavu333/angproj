import { Component, OnInit } from '@angular/core';
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
import { TooltipComponent } from "../../shared-components/tooltip/tooltip.component";


@Component({
    selector: 'app-manage-quizzes-page',
    standalone: true,
    templateUrl: './manage-quizzes-page.component.html',
    styleUrl: './manage-quizzes-page.component.css',
    animations: [scaleAnimation, fadeAnimation],
    imports: [CategoryColumnComponent, QuizEditorComponent, QuizInstanceEditorComponent, RouterOutlet, ReactiveFormsModule, DragDropModule, CommonModule, TooltipComponent]
})
export class ManageQuizzesPageComponent implements OnInit {
    //===========================================================================
    // properties, fields
    //===========================================================================
    newCategoryFG: FormGroup<any>;
    newCategoryFCName:string = 'newCategoryFC';
    newCategoryErrorMessages:string[] = [];

    //===========================================================================
    // constructors
    //===========================================================================
    constructor(public quizService: QuizService, private formBuilder: FormBuilder) {
        this.newCategoryFG = this.formBuilder.group({
            [this.newCategoryFCName]: ['', [Validators.required, containsUppercaseValidator()]] //equivalent  to 'newCategoryFC': ['', [Validators.required, containsUppercaseValidator()]]
        });
    }

    //=======================================================================A====
    // lifecycle hooks
    //===========================================================================
    ngOnInit(): void {
    }

    //===========================================================================
    // methods
    //===========================================================================
    public addCategory(): void {
        this.newCategoryErrorMessages = []; // clear error messages
        if (!this.newCategoryFG.valid) {

            const categoryInpErrors = this.newCategoryFG.get(this.newCategoryFCName)?.errors;
            for (const errorKey in categoryInpErrors) {
                    const errorMessage = this.getErrorMessage(errorKey);
                    this.newCategoryErrorMessages.push(errorMessage);
            }
            this.purgeErrorMessagesAfter(3000);
            return;
        }

        const newCategory = this.newCategoryFG.get(this.newCategoryFCName)?.value; 
        const category = new CategoryDTO(newCategory); 
        this.quizService.categoryAdded$tream.next(category);
        this.newCategoryFG.reset();
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

    purgeErrorMessagesAfter(delay: number) {
        setTimeout(() => {
            this.newCategoryErrorMessages = [];
        }, delay);
    }
}


function containsUppercaseValidator(): ValidatorFn {
    return function (control: AbstractControl): { [key: string]: any } | null {
        const containsUppercase = /[A-Z]/.test(control.value);
        return containsUppercase ? null : { containsUppercase: true };
    };
}