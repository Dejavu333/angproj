import { Component } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterOutlet } from '@angular/router';
import { BoxComponent } from "./box/box.component";
import { NavbarComponent } from "./shared/navbar/navbar.component";

@Component ({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, BoxComponent, NavbarComponent]
})
export class AppComponent {
  title = 'angtryProj';
}
