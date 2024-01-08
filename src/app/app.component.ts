import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./shared-components/sidebar/sidebar.component";
import { DragndropComponent } from "./dragndrop/dragndrop.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, SidebarComponent, DragndropComponent],
})
export class AppComponent {

}
