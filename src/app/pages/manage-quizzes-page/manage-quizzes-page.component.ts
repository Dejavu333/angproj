import { Component, OnInit } from '@angular/core';
import { CategoryColumnComponent } from "./category-column/category-column.component";
import { QuizEditorComponent } from './quiz-editor/QuizEditorComponent';
import { QuizInstanceEditorComponent } from "./quiz-instance-editor/quiz-instance-editor.component";
import { QuizService } from './quiz.service';
import { RouterOutlet } from "@angular/router";
import { AbstractControl, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { CategoryDTO } from "./model/CategoryDTO";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { fadeAnimation, scaleAnimation } from 'app/app.animations';
import { CommonModule } from '@angular/common';
import { TooltipComponent } from "../../shared-components/tooltip/tooltip.component";
import { PrintErrorComponent } from "../../shared-components/print-error/print-error.component";
import { FCConfDirective } from './FCConf.directive';
import { FGConfDirective } from './FGConf.directive';
import { FC } from './FC';
import { FG } from './FG';

@Component({
    selector: 'app-manage-quizzes-page',
    standalone: true,
    templateUrl: './manage-quizzes-page.component.html',
    styleUrl: './manage-quizzes-page.component.css',
    animations: [scaleAnimation, fadeAnimation],
    imports: [FGConfDirective, FCConfDirective, CategoryColumnComponent, QuizEditorComponent, QuizInstanceEditorComponent, RouterOutlet, ReactiveFormsModule, DragDropModule, CommonModule, TooltipComponent, PrintErrorComponent, FormsModule],
})
export class ManageQuizzesPageComponent implements OnInit {
    //===========================================================================
    // properties, fields
    //===========================================================================
    newCategoryFG: FG;
    upperFG:FG;
    newCategoryFCName: string = 'newCategoryFC';
    // newCategoryFC:FormControl = new FormControl('', [Validators.required, containsUppercaseVal()]);
    testfc: FC;

    //===========================================================================
    // constructors
    //===========================================================================
    constructor(public quizService: QuizService) {
        //FC_____________________________________
        const newCategoryFC = new FC(
            "somestartingvalue",
            {
                triggers: ["blur", "submit"],
                validators: [Validators.required, containsUppercaseVal()],
                cascadeValueChange: false,
                cascadeValidityCheck: true,
            },
        );
        const someFormControl = new FC(
            "initialvalue",
            {
                triggers: ["dblclick"],
                cascadeValidityCheck: true,
                cascadeValueChange: true,
                validators: [Validators.required, Validators.min(5)],
            },
        );

        //FG_____________________________________
        this.newCategoryFG = new FG(
            {  
                [this.newCategoryFCName]: newCategoryFC,
                "sometestcontrol": someFormControl,
            },
            {   triggers:["dblclick"],
                validators: [dummyValidator],
                cascadeValidityCheck: true,
                cascadeValueChange: true,
            }
        );

        this.testfc = this.newCategoryFG.getFC(this.newCategoryFCName);


        //upper FG_____________________________________
        this.upperFG = new FG(
            {
                "innerFG": this.newCategoryFG,
            },
            {
                triggers:[],
                cascadeValueChange: true,
                validators: [dummyValidator2]         
            }
        );
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
        const c = control as FC;
        console.log(c.FCConf);
        console.log("uppercasevalidatortriggered")
        const containsUppercase = /[A-Z]/.test(control.value);
        return containsUppercase ? null : { [containsUppercaseVal.name]: true };
    };
}

function dummyValidator(control: AbstractControl): ValidationErrors | null {
    console.log("dummyvalidatortriggered1")
    // return {"d":true};
    return null;
}

function dummyValidator2(control: AbstractControl): ValidationErrors | null {
    console.log("dummyvalidatortriggered2")
    // return {"d":true};
    return null;
}