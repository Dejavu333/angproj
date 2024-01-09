import { Component } from '@angular/core';
import { moveItemInArray, transferArrayItem, DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { fadeAnimation } from '../app.animations';

@Component({
  selector: 'app-dragndrop',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './dragndrop.component.html',
  styleUrl: './dragndrop.component.css',
  animations: [fadeAnimation],
})

export class DragndropComponent {
  columns = [
    { id: 1, items: [{ id: 1, name: 'item1' }, { id: 2, name: 'item2' }, { id: 3, name: 'item3' }, { id: 4, name: 'item4' }] },
    { id: 2, items: [] },
  ];

  lifecycleAnimationDuration = 300;
  isLifecycleAnimationDisabled = true;

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

  enableLifecycleAnimation() {
    this.isLifecycleAnimationDisabled = false;
  }

  disableLifecycleAnimation() {
    this.isLifecycleAnimationDisabled = true;
  }

  addItem(columnIndex: number) {
    this.enableLifecycleAnimation();

    const newItem = { id: Date.now(), name: `newItem${Date.now()}` };
    this.columns[columnIndex].items.push(newItem);

    setTimeout(() => {
      this.disableLifecycleAnimation();
    }, this.lifecycleAnimationDuration);
  }

  removeItem(columnIndex: number, itemId: number) {
    this.enableLifecycleAnimation();

    this.columns[columnIndex].items = this.columns[columnIndex].items.filter((item, index) => index !== itemId);

    setTimeout(() => {
      this.disableLifecycleAnimation();
    }, this.lifecycleAnimationDuration)
  }
}

