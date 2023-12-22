import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from './app/app.config';
import {AppComponent} from './app/app.component';

//a global emitter and elements can listen at that emitter indirectly using onEvent()
export function emitEvent(p_eventType: string, p_detail: any) {
  const event = new CustomEvent(p_eventType, {
    bubbles: false,
    detail: p_detail,
  });
  document.dispatchEvent(event);
}

export function onEvent(p_eventType: string, p_callback: (event: Event) => void) {
  document.addEventListener(p_eventType, (event) => {
    console.log(event);
    p_callback(event);
  });
}


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
