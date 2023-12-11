import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared-components/navbar/navbar.component";
import { DragndropComponent } from "./dragndrop/dragndrop.component";

@Component ({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, NavbarComponent, DragndropComponent],
})

export class AppComponent {
  title = 'angtryProj';
}
