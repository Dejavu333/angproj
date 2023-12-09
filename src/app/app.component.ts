import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared-components/navbar/navbar.component";
import { BoxComponent } from "./box/box.component";

@Component ({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, NavbarComponent, BoxComponent],
})

export class AppComponent {
  title = 'angtryProj';
}
