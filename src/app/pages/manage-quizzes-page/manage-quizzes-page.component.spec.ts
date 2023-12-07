import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageQuizzesPageComponent } from './manage-quizzes-page.component';

describe('ManageQuizzesPageComponent', () => {
  let component: ManageQuizzesPageComponent;
  let fixture: ComponentFixture<ManageQuizzesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageQuizzesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageQuizzesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
