import { Component, HostBinding, OnInit } from '@angular/core';
import { CategoryColumnComponent } from "./category-column/category-column.component";
import { QuizEditorComponent } from "./quiz-editor/quiz-editor.component";
import { QuizInstanceEditorComponent } from "./quiz-instance-editor/quiz-instance-editor.component";
import { QuizService } from './quiz.service';
import { RouterOutlet } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { CategoryDTO } from "./model/CategoryDTO";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { fadeAnimation, scaleAnimation } from 'app/app.animations';


@Component({
    selector: 'app-manage-quizzes-page',
    standalone: true,
    templateUrl: './manage-quizzes-page.component.html',
    styleUrl: './manage-quizzes-page.component.css',
    imports: [CategoryColumnComponent, QuizEditorComponent, QuizInstanceEditorComponent, RouterOutlet, ReactiveFormsModule, DragDropModule],
    animations: [scaleAnimation,fadeAnimation],
})
export class ManageQuizzesPageComponent implements OnInit {
    //===========================================================================
    // properties, fields
    //===========================================================================
    readonly errorMessages = {
        emptyError: "cannot be empty",
        duplicateError: "already exists"
    }

    @HostBinding('@fade') 
    public fade = "";

    //===========================================================================
    // constructors
    //===========================================================================
    constructor(public quizService: QuizService) {
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
        const category = new CategoryDTO(categoryName);
        this.quizService.categoryAdded$tream.next(category);
    }
}
