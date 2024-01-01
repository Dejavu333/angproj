import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailTemplatesPageComponent } from './email-templates-page.component';

describe('EmailTemplatesPageComponent', () => {
    let component: EmailTemplatesPageComponent;
    let fixture: ComponentFixture<EmailTemplatesPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EmailTemplatesPageComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(EmailTemplatesPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
