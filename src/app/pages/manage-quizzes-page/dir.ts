import { Directive, ElementRef,  Input, Optional, Renderer2, Self, } from "@angular/core";
import { FC } from "./manage-quizzes-page.component";
import { NgControl } from "@angular/forms";


export type TriggerEvents = ("blur" | "submit" | "click" | "dblclick" | "focus" | "input" | "hover")[];

@Directive({
    standalone: true,
    selector: '[FCConf]',
})
export class FCConfDirective {
    @Input()
    FCConf: TriggerEvents = [];
    nonOrdinaryTriggerEvents = ["submit"]

    constructor(private el: ElementRef, @Optional() @Self() private control: NgControl, private renderer: Renderer2) {
        if (!control) console.error("You didn't provide an FC instance to the element. Add [formControl]=yourFCInstance or [formControlName]='yourFCInstanceName'")
        console.log(this.el);
    }

    ngAfterViewInit() {
        this.FCConf.forEach(event => {
            if(!this.nonOrdinaryTriggerEvents.includes(event)) {
                this.renderer.listen(this.el.nativeElement, event, () => this.onEvent(event));
            }
            else if(event==="submit") {
                console.log("submit event requires special handling //todo");
            }
        });
    }

    // @HostListener('click')
    // click() {
    //     if (this.control?.control instanceof FC) {
    //         console.log(this.FCConf)
    //         this.control.control.manualUpdate = false;
    //         this.control.control?.updateValueAndValidity();
    //         this.control.control.manualUpdate = true;
    //     }
    // }

    private onEvent(event: string) {
        if (this.control?.control instanceof FC) {
          console.log(`Event: ${event}`);
          this.control.control.forceUpdateValueAndValidity();
        }
      }
}