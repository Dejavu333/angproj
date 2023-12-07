import { signal, computed, Component } from '@angular/core';

@Component({
  selector: 'app-box',
  standalone: true,
  imports: [],
  templateUrl: './box.component.html',
  styleUrl: './box.component.css'
})
export class BoxComponent {
  y = signal<number>(20);
  x = signal<number>(10);
  sumXY = computed<number>(()=> this.addXY());

  addXY():number {
    return this.x() + this.y();
  }
}