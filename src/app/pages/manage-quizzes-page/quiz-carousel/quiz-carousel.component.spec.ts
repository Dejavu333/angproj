import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizCarouselComponent } from './quiz-carousel.component';

describe('QuizCarouselComponent', () => {
  let component: QuizCarouselComponent;
  let fixture: ComponentFixture<QuizCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizCarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuizCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
