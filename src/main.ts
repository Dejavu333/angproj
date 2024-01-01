import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Global emitter
export function emitEvent(p_eventType: string, p_detail: any) {
    const event = new CustomEvent(p_eventType, {
        bubbles: false,
        detail: p_detail,
    });
    document.dispatchEvent(event);
}

bootstrapApplication(AppComponent, appConfig)
    .catch((err) => console.error(err));
