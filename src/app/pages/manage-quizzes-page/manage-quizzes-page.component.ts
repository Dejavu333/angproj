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
    newCategoryErrorMessages:string[] = []; //todo remove
    errorMessages: { [key: string]: string[] } = {}; //todo preferred to be in a seperate service

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
    public validFG(FG:FormGroup):boolean
    {
        // act on validation errors
        if (!FG.valid) {
            for (const FCName in FG.controls) {
                this.purgeErrorMessages(FCName);
                const FCErrors = FG.get(FCName)?.errors;
                for (const errorKey in FCErrors) {
                    if(this.errorMessages[FCName] == undefined) this.errorMessages[FCName] = [];
                    this.errorMessages[FCName].push(getErrorMessage(errorKey));
                }
                this.purgeErrorMessagesAfter(FCName,3000);
            }
            return false;
        }
        return true;
    }

    public validFC() { //todo implement

    }

    public addCategory(): void {
        if(!this.validFG(this.newCategoryFG)) return;
        // create new category 
        const newCategory = this.newCategoryFG.get(this.newCategoryFCName)?.value; 
        const category = new CategoryDTO(newCategory); 
        this.quizService.categoryAdded$tream.next(category);
        this.newCategoryFG.reset();             
    }
    
    private purgeErrorMessages(controlName: string) {
        // Clear error messages for a specific control
        this.errorMessages[controlName] = [];
    }
    
    private purgeErrorMessagesAfter(controlName: string, delay: number) {
        setTimeout(() => {
            this.purgeErrorMessages(controlName);
        }, delay);
    }
}



function getErrorMessage(errorName: string): string {
    const errorMessages = {
        [Validators.required.name]:     'This field is required.',
        [containsUppercaseVal.name]:    'The category must contain at least one uppercase letter.',
        // add more error cases as needed...
    };
   return errorMessages[errorName] || '';
}

function containsUppercaseVal(): ValidatorFn {
    return function (control: AbstractControl): { [key: string]: any } | null {
        const containsUppercase = /[A-Z]/.test(control.value);
        return containsUppercase ? null : { [containsUppercaseVal.name]: true };
    };
}