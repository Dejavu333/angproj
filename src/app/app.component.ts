import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BoxComponent } from "./box/box.component";
import { NavbarComponent } from "./shared/navbar/navbar.component";

@Component ({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, BoxComponent, NavbarComponent]
})
export class AppComponent {
  title = 'angtryProj';
}
