import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./shared-components/sidebar/sidebar.component";
import { DragndropComponent } from "./dragndrop/dragndrop.component";
import { scaleAnimation } from './app.animations';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, SidebarComponent, DragndropComponent],
    animations: [scaleAnimation],
})
export class AppComponent {

}
