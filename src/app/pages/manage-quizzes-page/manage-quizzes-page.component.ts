import { Component, OnInit } from '@angular/core';
import { CategoryColumnComponent } from "./category-column/category-column.component";
import { QuizEditorComponent } from "./quiz-editor/quiz-editor.component";
import { QuizInstanceEditorComponent } from "./quiz-instance-editor/quiz-instance-editor.component";
import { QuizService } from './quiz.service';
import { RouterOutlet } from "@angular/router";
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { CategoryDTO } from "./model/CategoryDTO";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { fadeAnimation, scaleAnimation } from 'app/app.animations';
import { CommonModule } from '@angular/common';
import { TooltipComponent } from "../../shared-components/tooltip/tooltip.component";
import { PrintErrorComponent } from "../../shared-components/print-error/print-error.component";
import { FCConfDirective } from './FCConf.directive';
import { FC } from './FC';

@Component({
    selector: 'app-manage-quizzes-page',
    standalone: true,
    templateUrl: './manage-quizzes-page.component.html',
    styleUrl: './manage-quizzes-page.component.css',
    animations: [scaleAnimation, fadeAnimation],
    imports: [FCConfDirective, CategoryColumnComponent, QuizEditorComponent, QuizInstanceEditorComponent, RouterOutlet, ReactiveFormsModule, DragDropModule, CommonModule, TooltipComponent, PrintErrorComponent, FormsModule],
})
export class ManageQuizzesPageComponent implements OnInit {
    //===========================================================================
    // properties, fields
    //===========================================================================
    newCategoryFG: FormGroup<any>;
    newCategoryFCName: string = 'newCategoryFC';
    // newCategoryFC:FormControl = new FormControl('', [Validators.required, containsUppercaseVal()]);
    testfc: FC;

    //===========================================================================
    // constructors
    //===========================================================================
    constructor(public quizService: QuizService, private formBuilder: FormBuilder) {
        this.newCategoryFG = this.formBuilder.group(
            {
                [this.newCategoryFCName]: new FC('', { triggers: ["dblclick", "blur"], cascadeValueChange: true }, { validators: [Validators.required, containsUppercaseVal()] })
            },
            { validators: dummyValidator });

        this.testfc = this.newCategoryFG.get(this.newCategoryFCName)! as FC;
    }

    //===========================================================================
    // lifecycle hooks
    //===========================================================================
    ngOnInit(): void {
    }

    //===========================================================================
    // methods
    //===========================================================================

    public addCategory(): void {
        if (!this.newCategoryFG.valid) return;
        // create new category 
        const newCategory = this.newCategoryFG.get(this.newCategoryFCName)?.value;
        const category = new CategoryDTO(newCategory);
        this.quizService.categoryAdded$tream.next(category);
        this.newCategoryFG.reset();
    }
}

export function containsUppercaseVal(): ValidatorFn {
    return function (control: AbstractControl): { [key: string]: any } | null {
        console.log("uppercasevalidatortriggered")
        const containsUppercase = /[A-Z]/.test(control.value);
        return containsUppercase ? null : { [containsUppercaseVal.name]: true };
    };
}

function dummyValidator(fg: FormGroup): ValidationErrors | null {
    console.log("dummyvalidatortriggered")
    // return {"d":true};
    return null;
}