import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizInstanceEditorComponent } from './quiz-instance-editor.component';

describe('QuizInstanceEditorComponent', () => {
    let component: QuizInstanceEditorComponent;
    let fixture: ComponentFixture<QuizInstanceEditorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [QuizInstanceEditorComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(QuizInstanceEditorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
