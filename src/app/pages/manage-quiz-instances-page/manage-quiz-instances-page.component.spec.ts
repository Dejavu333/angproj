import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageQuizInstancesPageComponent } from './manage-quiz-instances-page.component';

describe('ManageQuizInstancesPageComponent', () => {
    let component: ManageQuizInstancesPageComponent;
    let fixture: ComponentFixture<ManageQuizInstancesPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ManageQuizInstancesPageComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ManageQuizInstancesPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
