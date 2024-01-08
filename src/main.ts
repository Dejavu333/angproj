import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// utility functions
export function doWaitDo(doFirst:()=>void,wait:number,doSecond:()=>void):void {
    setTimeout(()=>{
        doFirst();
        setTimeout(()=>{
            doSecond();
        },wait);
    },0)
}

export function o(inp:any):void {
    console.log(inp);
}

bootstrapApplication(AppComponent, appConfig)
    .catch((err) => console.error(err));
