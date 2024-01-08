import { Component, HostBinding } from '@angular/core';
import { fadeAnimation } from 'app/app.animations';

@Component({
    selector: 'app-manage-quiz-instances-page',
    standalone: true,
    imports: [],
    templateUrl: './manage-quiz-instances-page.component.html',
    styleUrl: './manage-quiz-instances-page.component.css',
    animations: [fadeAnimation]
})
export class ManageQuizInstancesPageComponent {
    @HostBinding('@fade') 
    public fade = "";
}
