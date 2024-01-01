import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendQuizPageComponent } from './attend-quiz-page.component';

describe('AttendQuizPageComponent', () => {
    let component: AttendQuizPageComponent;
    let fixture: ComponentFixture<AttendQuizPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AttendQuizPageComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AttendQuizPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
