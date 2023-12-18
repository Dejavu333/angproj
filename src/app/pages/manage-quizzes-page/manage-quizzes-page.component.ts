import { Component } from '@angular/core';
import { QuizColumnComponent } from "./quiz-column/quiz-column.component";
import { QuizEditorComponent } from "./quiz-editor/quiz-editor.component";
import { QuizInstanceEditorComponent } from "./quiz-instance-editor/quiz-instance-editor.component";

@Component({
    selector: 'app-manage-quizzes-page',
    standalone: true,
    templateUrl: './manage-quizzes-page.component.html',
    styleUrl: './manage-quizzes-page.component.css',
    imports: [QuizColumnComponent, QuizEditorComponent, QuizInstanceEditorComponent]
})
export class ManageQuizzesPageComponent {
columnTitles: any;

}
