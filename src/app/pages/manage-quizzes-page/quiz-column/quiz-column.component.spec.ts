import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizColumnComponent } from './quiz-column.component';

describe('QuizColumnComponent', () => {
  let component: QuizColumnComponent;
  let fixture: ComponentFixture<QuizColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizColumnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuizColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
