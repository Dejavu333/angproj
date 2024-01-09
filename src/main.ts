import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

export function o(input: any): void {
    console.log(input);
}

export function doInSequence(...fns: ((input?: any) => any)[]): void {
    for (const fn of fns) {
        setTimeout(()=>fn()); //queue
    }
}

bootstrapApplication(AppComponent, appConfig)
    .catch((err) => console.error(err));
