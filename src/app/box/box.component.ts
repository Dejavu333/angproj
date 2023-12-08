import { signal, computed, Component } from '@angular/core';
import { moveItemInArray, transferArrayItem, DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-box',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './box.component.html',
  styleUrl: './box.component.css'
})
// export class BoxComponent {
//   y = signal<number>(20);
//   x = signal<number>(10);
//   sumXY = computed<number>(()=> this.addXY());

//   addXY():number {
//     return this.x() + this.y();
//   }
// }


export class BoxComponent {
  columns = [
    { id: 1, items: [{ id: 1, name: 'item1' }, { id: 2, name: 'item2' }, { id: 3, name: 'item3' }, { id: 4, name: 'item4' }] },
    { id: 2, items: [] },
  ];

  animationDurationMs = 300;
  animateNewItem = false;

  getConnectedLists(index: number): string[] {
    return this.columns.map((_, i) => 'column-' + i);
  }  

  handleDrop(event: CdkDragDrop<any[]>, columnIndex: number) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  addColumn() {
    const newColumn = { id: Date.now(), items: [] };
    this.columns.push(newColumn);
  }

  removeColumn(columnIndex: number) {
    this.columns.splice(columnIndex, 1);
  }

  addItem(columnIndex: number) {
    this.animateNewItem = true;
    const newItem = { id: Date.now(), name: `newItem${Date.now()}` };
    this.columns[columnIndex].items.push(newItem);

    setTimeout(() => {
      this.animateNewItem = false;
    }, this.animationDurationMs);
  }

  removeItem(columnIndex: number, itemId: number) {
    this.columns[columnIndex].items = this.columns[columnIndex].items.filter((item, index) => index !== itemId);
  }
}

