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
            [this.newCategoryFCName]: ['', [Validators.required, containsUppercaseVal()]] //equivalent  to 'newCategoryFC': ['', [Validators.required, containsUppercaseValidator()]]
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
        // act on val errors
        this.purgeErrorMessages();
        if (!this.newCategoryFG.valid) {
            const categoryInpErrors = this.newCategoryFG.get(this.newCategoryFCName)?.errors;
            for (const errorKey in categoryInpErrors) {
                this.newCategoryErrorMessages.push(getErrorMessage(errorKey));
            }
            this.purgeErrorMessagesAfter(3000);
            return;
        }
        // create new category 
        const newCategory = this.newCategoryFG.get(this.newCategoryFCName)?.value; 
        const category = new CategoryDTO(newCategory); 
        this.quizService.categoryAdded$tream.next(category);
        this.newCategoryFG.reset();
    }
    
    private purgeErrorMessages() {
        this.newCategoryErrorMessages = []; // clear error messages
    }
    
    private purgeErrorMessagesAfter(delay: number) {
        setTimeout(() => {
            this.purgeErrorMessages();
        }, delay);
    }
}



function getErrorMessage(errorName: string): string {
    const errorMessages = {
        [Validators.required.name]:     'This field is required.',
        [containsUppercaseVal.name]:    'The category must contain at least one uppercase letter.',
        // Add more error cases as needed...
    };
   return errorMessages[errorName] || '';
}

function containsUppercaseVal(): ValidatorFn {
    return function (control: AbstractControl): { [key: string]: any } | null {
        const containsUppercase = /[A-Z]/.test(control.value);
        return containsUppercase ? null : { [containsUppercaseVal.name]: true };
    };
}